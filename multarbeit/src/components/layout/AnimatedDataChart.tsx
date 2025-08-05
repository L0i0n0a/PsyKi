'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrialsButton } from '@/utils/analyzeParticipant';
import rawData from '../../store/results.json';

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Calculates the median value from an array of numbers
 *
 * The median is used instead of mean to provide a robust measure of central
 * tendency that is less affected by outliers in the d-prime distribution.
 * This is particularly important in psychological research where individual
 * differences can create extreme values.
 *
 * @param {number[]} values - Array of numerical values
 * @returns {number} The median value
 */
const calculateMedian = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  // For odd-length arrays, return middle value
  // For even-length arrays, return average of two middle values
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for trial data structure used in Signal Detection Theory analysis
 *
 * Each trial represents a single decision point in the research study where
 * participants make judgments about visual stimuli with AI assistance.
 */
type Trial = {
  /** Trial sequence number, with 199 being the final measurement point */
  index: number;
  /** Unique session identifier for grouping participant data */
  sessionId?: string;
  /** Alternative participant identifier */
  participantId?: string;
  /** Color value of the stimulus (signal/noise classification) */
  color: number;
  /** Participant's confidence/decision slider value */
  sliderValue: number;
  /** Timestamp of the trial completion */
  timestamp: string;
  /** Button pressed by participant for binary decisions */
  buttonPressed?: string;
  /** AI recommendation value for comparison */
  aiGuessValue?: number;
};

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * Animated Data Chart Component
 *
 * Processes research data to calculate the median d-prime team value and
 * displays it alongside a reference value in an animated horizontal bar chart.
 * This visualization helps researchers understand overall study performance
 * compared to established benchmarks.
 *
 * @returns {JSX.Element} Animated comparison chart or loading indicator
 */
const AnimatedDataChart: React.FC = () => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  /** Median d-prime team value, null during loading */
  const [median, setMedian] = useState<number | null>(null);

  /** Reference benchmark value for comparison */
  const reference = 3.8;

  /* ========================================
     DATA PROCESSING EFFECT
     ======================================== */

  /**
   * Effect: Process research data and calculate median d-prime team value
   *
   * This effect:
   * 1. Groups trials by unique session/participant identifiers
   * 2. Filters for index 199 (final measurement point)
   * 3. Computes d-prime team values using Signal Detection Theory
   * 4. Calculates the median for robust central tendency
   */
  useEffect(() => {
    /** Grouped trials by unique session identifier */
    const groupedBySession: Record<string, Trial[]> = {};

    // Process raw data and group trials by participant/session
    Object.values(rawData).forEach((trials: Trial[]) => {
      trials.forEach((trial: Trial) => {
        // Focus on final measurement point (index 199)
        if (trial.index === 199) {
          const id = trial.sessionId || trial.participantId || 'unknown';
          if (!groupedBySession[id]) {
            groupedBySession[id] = [];
          }
          groupedBySession[id].push(trial);
        }
      });
    });

    // Calculate d-prime team values for each participant/session
    const dPrimeTeamValues = Object.values(groupedBySession)
      .map((trials: Trial[]) => {
        // Use Signal Detection Theory analysis utility
        const result = computeSDTfromTrialsButton(trials);
        return parseFloat(result.dPrimes.team);
      })
      .filter((val) => !isNaN(val)); // Remove invalid calculations

    // Calculate median if we have valid data
    if (dPrimeTeamValues.length > 0) {
      const medianValue = calculateMedian(dPrimeTeamValues);
      setMedian(medianValue);
    }
  }, []);

  /* ========================================
     LOADING STATE
     ======================================== */

  // Show loading indicator while processing data
  if (median === null) {
    return <p className='text-center mt-10 text-gray-500'>Lade Daten…</p>;
  }

  /* ========================================
     CHART CALCULATIONS
     ======================================== */

  /** Maximum value for chart scaling */
  const maxVal = Math.max(median, reference);

  /* ========================================
     RENDER
     ======================================== */

  return (
    <section className='p-10 bg-white rounded-2xl shadow-xl max-w-xl mx-auto mt-16'>
      {/* Chart Title */}
      <h2 className='text-2xl font-semibold mb-6 text-center'>
        Vergleich: <span className='text-orange-500'>dPrimeTeam-Median</span> vs Referenzwert
      </h2>

      {/* Comparison Bars */}
      <div className='space-y-6'>
        {[
          {
            label: 'Median (Index 199)',
            value: median,
            color: '#60a5fa', // Blue color for participant data
          },
          {
            label: 'Referenzwert (3.8)',
            value: reference,
            color: '#f87171', // Red color for reference benchmark
          },
        ].map(({ label, value, color }, i) => (
          <div key={i}>
            {/* Bar Label and Value */}
            <div className='flex justify-between mb-1 text-sm font-medium text-gray-700'>
              <span>{label}</span>
              <span>{value.toFixed(2)}</span>
            </div>

            {/* Animated Horizontal Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(value / maxVal) * 100}%` }}
              transition={{ duration: 0.6 }}
              className='h-5 rounded-lg'
              style={{ backgroundColor: color }}
              aria-label={`${label}: ${value.toFixed(2)}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedDataChart;
