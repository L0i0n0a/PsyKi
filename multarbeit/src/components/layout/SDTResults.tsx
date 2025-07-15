import React from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrials } from '@/utils/analyzeParticipant';

type SDTResultsProps = {
  results: ReturnType<typeof computeSDTfromTrials>;
};

export default function SDTResults({ results }: SDTResultsProps) {
  const { counts, rates, dPrimes, decisionWeights } = results;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">✅ Response Counts</h2>
        <ul className="text-sm space-y-1">
          <li>Hits: {counts.hits}</li>
          <li>Misses: {counts.misses}</li>
          <li>False Alarms: {counts.falseAlarms}</li>
          <li>Correct Rejections: {counts.correctRejects}</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">📊 Rates</h2>
        <ul className="text-sm space-y-1">
          <li>Hit Rate: {rates.hitRate}</li>
          <li>False Alarm Rate: {rates.falseAlarmRate}</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">🧠 d' Sensitivity</h2>
        <ul className="text-sm space-y-1">
          <li>Human: {dPrimes.human}</li>
          <li>AI: {dPrimes.ai}</li>
          <li>Team: {dPrimes.team}</li>
        </ul>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">⚖️ Decision Weights</h2>
        <ul className="text-sm space-y-1">
          <li>Human α: {decisionWeights.aHuman}</li>
          <li>AI α: {decisionWeights.aAid}</li>
        </ul>
      </div>
    </motion.div>
  );
}
