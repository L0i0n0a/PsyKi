'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrialsButton } from '@/utils/analyzeParticipant'; // adjust the path
import rawData from '../../store/results.json'; // assumed to be raw trial data
// import { jStat } from 'jstat'; // make sure this is installed

const calculateMedian = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const AnimatedDataChart: React.FC = () => {
  const [median, setMedian] = useState<number | null>(null);
  const reference = 3.8;

  useEffect(() => {
    type Trial = {
      index: number;
      sessionId?: string;
      participantId?: string;
      color: number;
      sliderValue: number;
      timestamp: string;
      buttonPressed?: string;
      aiGuessValue?: number;
      // add other properties as needed
    };
    const groupedBySession: Record<string, Trial[]> = {};

    // Group trials by unique session/user identifier
    Object.values(rawData).forEach((trials: Trial[]) => {
      trials.forEach((trial: Trial) => {
        if (trial.index === 199) {
          const id = trial.sessionId || trial.participantId || 'unknown';
          if (!groupedBySession[id]) groupedBySession[id] = [];
          groupedBySession[id].push(trial);
        }
      });
    });

    const dPrimeTeamValues = Object.values(groupedBySession)
      .map((trials: Trial[]) => {
        const result = computeSDTfromTrialsButton(trials);
        return parseFloat(result.dPrimes.team);
      })
      .filter((val) => !isNaN(val));

    if (dPrimeTeamValues.length > 0) {
      const medianValue = calculateMedian(dPrimeTeamValues);
      setMedian(medianValue);
    }
  }, []);

  if (median === null) {
    return <p className='text-center mt-10 text-gray-500'>Lade Daten…</p>;
  }

  const maxVal = Math.max(median, reference);

  return (
    <section className='p-10 bg-white rounded-2xl shadow-xl max-w-xl mx-auto mt-16'>
      <h2 className='text-2xl font-semibold mb-6 text-center'>
        Vergleich: <span className='text-orange-500'>dPrimeTeam-Median</span> vs Referenzwert
      </h2>

      <div className='space-y-6'>
        {[
          { label: 'Median (Index 199)', value: median, color: '#60a5fa' },
          { label: 'Referenzwert (3.8)', value: reference, color: '#f87171' },
        ].map(({ label, value, color }, i) => (
          <div key={i}>
            <div className='flex justify-between mb-1 text-sm font-medium text-gray-700'>
              <span>{label}</span>
              <span>{value.toFixed(2)}</span>
            </div>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(value / maxVal) * 100}%` }} transition={{ duration: 0.6 }} className='h-5 rounded-lg' style={{ backgroundColor: color }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedDataChart;
