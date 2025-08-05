'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import jsonData from '../../store/results.json';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual bar entries in the chart
 *
 * Each bar represents either a participant's performance or the reference value
 * used for comparison in the Signal Detection Theory analysis.
 */
type BarEntry = {
  /** Display label for the bar (e.g., "TN 1", "Referenz") */
  label: string;
  /** d-prime value representing discrimination ability */
  value: number;
  /** Flag indicating if this bar represents the reference value */
  isReference?: boolean;
};

/* ========================================
   DATA EXTRACTION UTILITIES
   ======================================== */

/**
 * Extracts all d-prime team values at index 199 from the research data
 *
 * This function recursively searches through the nested JSON structure to find
 * all dPrimeTeam values at index 199, which represents the final measurement
 * point in the study where participants have completed the full protocol.
 *
 * Index 199 is significant as it represents the culmination of the learning
 * process in the Optimal Weighting strategy implementation.
 *
 * @param {unknown} data - The research data object to search through
 * @returns {number[]} Array of d-prime team values at index 199
 */
const getAllDPrimeIndex199 = (data: unknown): number[] => {
  const values: number[] = [];

  /**
   * Recursive search function to traverse the data structure
   *
   * @param {unknown} obj - Current object/array being searched
   */
  const search = (obj: unknown) => {
    if (Array.isArray(obj)) {
      // If it's an array, search each element
      obj.forEach(search);
    } else if (typeof obj === 'object' && obj !== null) {
      const o = obj as { [key: string]: unknown };

      // Check if this object has the target index and dPrimeTeam value
      if (o.index === 199 && typeof o.dPrimeTeam === 'number') {
        values.push(o.dPrimeTeam);
      }

      // Recursively search all object values
      Object.values(o).forEach(search);
    }
  };

  search(data);
  return values;
};

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * All Participants Chart Component
 *
 * Renders an animated bar chart showing d-prime team values for all participants
 * compared against a reference value. The visualization helps researchers understand:
 * - Individual participant performance in signal detection
 * - Relative performance compared to a benchmark
 * - Distribution of discrimination abilities across the study population
 * - Effectiveness of the Optimal Weighting strategy
 *
 * @returns {JSX.Element} Animated bar chart with participant d-prime values
 */
const AllParticipantsChart: React.FC = () => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  /** Chart data containing participant and reference values */
  const [bars, setBars] = useState<BarEntry[]>([]);

  /* ========================================
     DATA PROCESSING EFFECT
     ======================================== */

  /**
   * Effect: Process research data and prepare chart visualization
   *
   * Extracts d-prime values, creates participant labels, and inserts
   * the reference value for comparison. The reference value (3.8) is
   * positioned in the middle of the participant data for visual balance.
   */
  useEffect(() => {
    // Extract all d-prime team values at the final measurement point
    const values = getAllDPrimeIndex199(jsonData);

    // Create bar entries for each participant with anonymized labels
    const participantBars: BarEntry[] = values.map((v, i) => ({
      label: `TN ${i + 1}`, // "TN" = Teilnehmer (Participant) in German
      value: v,
    }));

    // Insert reference value at the middle for visual comparison
    const middleIndex = Math.floor(participantBars.length / 2);
    const withReference: BarEntry[] = [
      ...participantBars.slice(0, middleIndex),
      {
        label: 'Referenz',
        value: 3.8, // Benchmark d-prime value for comparison
        isReference: true,
      },
      ...participantBars.slice(middleIndex),
    ];

    setBars(withReference);
  }, []);

  /* ========================================
     CHART CALCULATIONS
     ======================================== */

  /** Calculate maximum value for chart scaling, ensuring minimum scale of 4.5 */
  const max = Math.max(...bars.map((b) => b.value), 4.5);

  /* ========================================
     RENDER
     ======================================== */

  return (
    <section className='p-10 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto mt-16'>
      {/* Chart Title */}
      <h2 className='text-2xl font-semibold mb-6 text-center'>
        <span className='text-violet-600'>dPrimeTeam</span>-Werte (Index 199) mit Referenz
      </h2>

      {/* Chart Container */}
      <div className='relative h-64 border-l border-b border-gray-300 pt-8 overflow-x-auto '>
        <div className='flex justify-end items-end gap-2 h-full w-fit relative'>
          {bars.map((bar, i) => {
            // Calculate bar height as percentage of maximum value
            const heightPercent = (bar.value / max) * 100;

            return (
              <div key={i} className='flex flex-col items-center w-8 relative h-full justify-end'>
                {/* Value Label Above Bar */}
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.015 }}
                  className={`text-xs mb-1 absolute -top-5 ${bar.isReference ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
                  {bar.value.toFixed(2)}
                </motion.div>

                {/* Animated Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.5, delay: i * 0.015 }}
                  className={`w-full rounded-t-md ${bar.isReference ? 'bg-red-400 border border-red-600' : 'bg-violet-500 hover:bg-violet-600'}`}
                />

                {/* Participant Label Below Bar */}
                <div className={`text-[10px] mt-1 text-center ${bar.isReference ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>{bar.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Summary */}
      <div className='text-center text-sm text-gray-500 mt-3'>{bars.length - 1} Teilnehmer &nbsp;•&nbsp; 1 Referenzwert</div>
    </section>
  );
};

export default AllParticipantsChart;
