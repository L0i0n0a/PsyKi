import React from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrials } from '@/utils/analyzeParticipant';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the SDTResults component
 *
 * Defines the structure of processed SDT analysis results required
 * for comprehensive performance metrics visualization.
 */
type SDTResultsProps = {
  /** Complete SDT analysis results from computeSDTfromTrials utility */
  results: ReturnType<typeof computeSDTfromTrials>;
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * SDTResults - Signal Detection Theory Results Display Component
 *
 * Renders a comprehensive dashboard of Signal Detection Theory metrics in a
 * responsive grid layout. Each metric category is presented in a dedicated
 * card with clear labeling and visual hierarchy for easy interpretation.
 *
 * The component uses Framer Motion to provide smooth entrance animations,
 * enhancing the user experience while maintaining focus on the data presentation.
 * The grid layout automatically adapts to different screen sizes for optimal
 * viewing across devices.
 *
 * @param {SDTResultsProps} props - Component props containing SDT analysis results
 * @returns {React.FC} Animated grid of SDT metric cards
 */
export default function SDTResults({ results }: SDTResultsProps) {
  /* ----------------------------------------
     DATA EXTRACTION
     ---------------------------------------- */

  // Extract SDT analysis components for organized display
  const { counts, rates, dPrimes, decisionWeights } = results;

  /* ----------------------------------------
     COMPONENT RENDER
     ---------------------------------------- */

  return (
    <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6' initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {/* ========================================
          RESPONSE COUNTS CARD
          ======================================== */}

      {/* Raw frequency counts for all response categories */}
      <div className='bg-white shadow-lg rounded-2xl p-5'>
        <h2 className='text-lg font-semibold mb-3'>✅ Response Counts</h2>
        <ul className='text-sm space-y-1'>
          <li>Hits: {counts.hits}</li>
          <li>Misses: {counts.misses}</li>
          <li>False Alarms: {counts.falseAlarms}</li>
          <li>Correct Rejections: {counts.correctRejects}</li>
        </ul>
      </div>

      {/* ========================================
          DETECTION RATES CARD
          ======================================== */}

      {/* Calculated detection performance rates */}
      <div className='bg-white shadow-lg rounded-2xl p-5'>
        <h2 className='text-lg font-semibold mb-3'>📊 Rates</h2>
        <ul className='text-sm space-y-1'>
          <li>Hit Rate: {rates.hitRate}</li>
          <li>False Alarm Rate: {rates.falseAlarmRate}</li>
        </ul>
      </div>

      {/* ========================================
          SENSITIVITY MEASURES CARD
          ======================================== */}

      {/* d-prime values for discriminability analysis */}
      <div className='bg-white shadow-lg rounded-2xl p-5'>
        <h2 className='text-lg font-semibold mb-3'>🧠 d&#39; Sensitivity</h2>
        <ul className='text-sm space-y-1'>
          <li>Human: {dPrimes.human}</li>
          <li>AI: {dPrimes.ai}</li>
          <li>Team: {dPrimes.team}</li>
        </ul>
      </div>

      {/* ========================================
          DECISION BIAS MEASURES CARD
          ======================================== */}

      {/* Alpha values for response criterion analysis */}
      <div className='bg-white shadow-lg rounded-2xl p-5'>
        <h2 className='text-lg font-semibold mb-3'>⚖️ Decision Weights</h2>
        <ul className='text-sm space-y-1'>
          <li>Human α: {decisionWeights.aHuman}</li>
          <li>AI α: {decisionWeights.aAid}</li>
        </ul>
      </div>
    </motion.div>
  );
}
