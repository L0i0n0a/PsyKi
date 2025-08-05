'use client';

import React from 'react';
import rawData from '@/store/participants.json'; // adjust path as needed
import { analyzeParticipant } from '@/utils/analyzeParticipant';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual trial data structure
 *
 * Represents a single decision trial in the research experiment,
 * containing participant responses and system information.
 */
interface Trial {
  /** Trial sequence number for ordering */
  index: number;
  /** Correct color category (0 or 1) for the trial */
  color: number;
  /** Participant's slider response value (-100 to +100) */
  sliderValue: number;
  /** Trial completion timestamp for temporal analysis */
  timestamp: string;
  /** Participant's binary decision (blue/orange) derived from slider */
  buttonPressed?: string;
  /** AI model's confidence value for the trial */
  aiGuessValue?: number;
}

/**
 * Interface for processed participant results
 *
 * Contains the analyzed results for a single participant,
 * including their unique identifier and calculated SDT metrics.
 */
interface ParticipantResult {
  /** Unique participant identifier from filename */
  id: string;
  /** Analyzed Signal Detection Theory metrics summary */
  summary: ReturnType<typeof analyzeParticipant>['summary'];
}

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * ParticipantsResults Component
 *
 * Processes and displays Signal Detection Theory analysis results for all
 * participants in the study. Converts raw trial data into meaningful
 * performance metrics for comprehensive research evaluation.
 *
 * @returns {React.FC} Rendered results table with comprehensive SDT analysis
 */
const ParticipantsResults: React.FC = () => {
  /* ========================================
     DATA PROCESSING
     ======================================== */

  /**
   * Process raw participant data into analyzed results
   *
   * Transforms trial data and calculates Signal Detection Theory metrics
   * for each participant in the study. Enriches raw trial data with
   * derived decision values and applies comprehensive SDT analysis.
   */
  const participants: ParticipantResult[] = Object.entries(rawData).map(([filename, trials]) => {
    // Enrich trial data with derived decision values
    const enrichedTrials = (trials as Trial[]).map((trial) => ({
      ...trial,
      // Convert slider value to binary decision (blue for positive, orange for negative)
      buttonPressed: trial.sliderValue >= 0 ? 'blue' : 'orange',
      aiGuessValue: Math.random(),
    }));

    // Perform comprehensive Signal Detection Theory analysis
    const analysis = analyzeParticipant(enrichedTrials);

    return {
      id: filename.replace('.json', ''),
      summary: analysis.summary,
    };
  });

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Teilnehmer-Ergebnisse</h2>
      <table className='w-full border text-sm'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Accuracy</th>
            <th className='border p-2'>Hit Rate</th>
            <th className='border p-2'>FA Rate</th>
            <th className='border p-2'>d′ Human</th>
            <th className='border p-2'>d′ Aid</th>
            <th className='border p-2'>d′ Team</th>
            <th className='border p-2'>aHuman</th>
            <th className='border p-2'>aAid</th>
          </tr>
        </thead>

        {/* Participant Data Rows */}
        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
              <td className='border p-2'>{p.id}</td>
              <td className='border p-2'>{p.summary.accuracy}%</td>
              <td className='border p-2'>{p.summary.hitRate}</td>
              <td className='border p-2'>{p.summary.falseAlarmRate}</td>
              <td className='border p-2'>{p.summary.dPrimeHuman}</td>
              <td className='border p-2'>{p.summary.dPrimeAid}</td>
              <td className='border p-2'>{p.summary.dPrimeTeam}</td>
              <td className='border p-2'>{p.summary.aHuman}</td>
              <td className='border p-2'>{p.summary.aAid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsResults;
