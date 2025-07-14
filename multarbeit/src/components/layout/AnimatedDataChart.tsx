'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Replace with your imported JSON data
import jsonData from '../../store/results.json';

const getDPrimeValuesWithIndex199 = (data: unknown): number[] => {
  const dprimeValues: number[] = [];

  const recursiveSearch = (obj: unknown) => {
    if (Array.isArray(obj)) {
      obj.forEach((item) => recursiveSearch(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const maybeObj = obj as { [key: string]: unknown };
      if (maybeObj.index === 199 && typeof maybeObj.dPrimeTeam === 'number') {
        dprimeValues.push(maybeObj.dPrimeTeam);
      }
      Object.values(maybeObj).forEach((val) => recursiveSearch(val));
    }
  };

  recursiveSearch(data);
  return dprimeValues;
};

const calculateMedian = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const AnimatedDataChart: React.FC = () => {
  const [median, setMedian] = useState<number | null>(null);
  const reference = 3.8;

  useEffect(() => {
    const values = getDPrimeValuesWithIndex199(jsonData);
    if (values.length > 0) {
      setMedian(calculateMedian(values));
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
          { label: 'Median (index 199)', value: median, color: '#60a5fa' },
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
