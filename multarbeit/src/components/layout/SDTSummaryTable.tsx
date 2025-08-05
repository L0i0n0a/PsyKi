import React from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrialsButton } from '@/utils/analyzeParticipant';

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
  /** Participant's binary decision (blue/orange, optional) */
  buttonPressed?: string;
  /** AI model's confidence value for the trial (optional) */
  aiGuessValue?: number;
}

/**
 * Type definition for participant data structure
 *
 * Maps participant IDs to their complete trial data arrays
 * for comprehensive analysis across all study participants.
 */
type ParticipantData = {
  [participantId: string]: Trial[];
};

/**
 * Props interface for the SDTSummaryTable component
 *
 * Defines the data structure required to generate comprehensive
 * SDT analysis table with filtering and statistical aggregation.
 */
type SDTSummaryTableProps = {
  /** Complete participant data with trial information */
  participantData: ParticipantData;
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * SDTSummaryTable - Comprehensive Signal Detection Theory Summary Table
 *
 * Creates a detailed summary table displaying SDT analysis results for all
 * qualified participants in the study. Applies performance-based filtering
 * and calculates aggregate statistics for research analysis.
 *
 * @param {SDTSummaryTableProps} props - Component props containing participant data
 * @returns {React.FC} Animated summary table with comprehensive SDT analysis
 */
export default function SDTSummaryTable({ participantData }: SDTSummaryTableProps) {
  /* ----------------------------------------
     DATA FILTERING AND PREPARATION
     ---------------------------------------- */

  // Convert participant data to entries for processing
  const participantEntries = Object.entries(participantData);

  /**
   * Filter participants based on performance criteria
   *
   * Applies d-prime threshold filtering (≥1.0) to ensure data quality
   * while maintaining original participant index mapping for identification.
   */
  const filteredEntriesWithOriginalIdx = participantEntries
    .map(([participantId, trials], idx) => ({ participantId, trials, originalIdx: idx }))
    .filter(({ trials }) => {
      const results = computeSDTfromTrialsButton(trials);
      const dPrimeHuman = parseFloat(results.dPrimes.human);
      return dPrimeHuman >= 1; // Performance threshold filter
    });

  // Count of qualified participants for mean calculations
  const numIncluded = filteredEntriesWithOriginalIdx.length;

  /* ----------------------------------------
     STATISTICAL AGGREGATION INITIALIZATION
     ---------------------------------------- */

  /**
   * Initialize totals object for statistical aggregation
   *
   * Accumulates values across all participants for mean calculations
   * of all SDT metrics displayed in the summary table.
   */
  const totals = {
    hits: 0,
    misses: 0,
    falseAlarms: 0,
    correctRejects: 0,
    hitRate: 0,
    falseAlarmRate: 0,
    dPrimeHuman: 0,
    dPrimeAI: 0,
    dPrimeTeam: 0,
    dPrimeTeamSimple: 0,
  };

  /* ----------------------------------------
     TABLE ROW GENERATION
     ---------------------------------------- */

  /**
   * Generate animated table rows for each participant
   *
   * Processes filtered participant data to create table rows with
   * SDT analysis results, accumulating totals for statistical means.
   */
  const rows = filteredEntriesWithOriginalIdx.map(({ participantId, trials, originalIdx }, idx) => {
    // Calculate SDT metrics for current participant
    const results = computeSDTfromTrialsButton(trials);
    const { counts, rates, dPrimes } = results;

    // Parse numeric values for calculations
    const hitRate = parseFloat(rates.hitRate);
    const faRate = parseFloat(rates.falseAlarmRate);
    const dHuman = parseFloat(dPrimes.human);
    const dAI = parseFloat(dPrimes.ai);
    const dTeam = parseFloat(dPrimes.team);
    const dTeamSimple = parseFloat(dPrimes.teamSimple);

    // Accumulate totals for mean calculations
    totals.hits += counts.hits;
    totals.misses += counts.misses;
    totals.falseAlarms += counts.falseAlarms;
    totals.correctRejects += counts.correctRejects;
    totals.hitRate += hitRate;
    totals.falseAlarmRate += faRate;
    totals.dPrimeHuman += dHuman;
    totals.dPrimeAI += dAI;
    totals.dPrimeTeam += dTeam;
    totals.dPrimeTeamSimple += dTeamSimple;

    // Alternating row colors for visual clarity
    const rowStyle = idx % 2 === 0 ? { backgroundColor: '#e2f4f9ff' } : {};

    return (
      <motion.tr key={participantId} style={rowStyle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
        <td style={{ textAlign: 'right', paddingRight: '10px' }}>{`${originalIdx + 1}`}</td>
        <td>{counts.hits}</td>
        <td>{counts.misses}</td>
        <td>{counts.falseAlarms}</td>
        <td>{counts.correctRejects}</td>
        <td>{rates.hitRate}</td>
        <td>{rates.falseAlarmRate}</td>
        <td>{dPrimes.human}</td>
        <td>{dPrimes.ai}</td>
        <td>{dPrimes.team}</td>
        <td>{dPrimes.teamSimple}</td>
      </motion.tr>
    );
  });

  /* ----------------------------------------
     STATISTICAL MEAN CALCULATIONS
     ---------------------------------------- */

  /**
   * Calculate mean values across all included participants
   *
   * Computes statistical means for all SDT metrics to provide
   * aggregate performance measures for research analysis.
   */
  const means = {
    hits: (totals.hits / numIncluded).toFixed(2),
    misses: (totals.misses / numIncluded).toFixed(2),
    falseAlarms: (totals.falseAlarms / numIncluded).toFixed(2),
    correctRejects: (totals.correctRejects / numIncluded).toFixed(2),
    hitRate: (totals.hitRate / numIncluded).toFixed(2),
    falseAlarmRate: (totals.falseAlarmRate / numIncluded).toFixed(2),
    dPrimeHuman: (totals.dPrimeHuman / numIncluded).toFixed(2),
    dPrimeAI: (totals.dPrimeAI / numIncluded).toFixed(2),
    dPrimeTeam: (totals.dPrimeTeam / numIncluded).toFixed(2),
    dPrimeTeamSimple: (totals.dPrimeTeamSimple / numIncluded).toFixed(2),
  };

  /* ----------------------------------------
     TABLE COMPONENT RENDER
     ---------------------------------------- */

  return (
    <motion.table
      border={1}
      cellPadding={10}
      style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
      {/* ========================================
          TABLE HEADER
          ======================================== */}

      <thead>
        <tr>
          <th style={{ textAlign: 'right', paddingRight: '10px' }}>ID</th>
          <th>Hits</th>
          <th>Misses</th>
          <th>False Alarms</th>
          <th>Correct Rejections</th>
          <th>Hit Rate</th>
          <th>False Alarm Rate</th>
          <th>d&apos; Human</th>
          <th>d&apos; AI</th>
          <th>d&apos; Team</th>
          <th>d&apos; TeamSimple</th>
        </tr>
      </thead>

      {/* ========================================
          TABLE BODY WITH PARTICIPANT DATA
          ======================================== */}

      <tbody>
        {/* Individual participant rows */}
        {rows}

        {/* Statistical means summary row */}
        <motion.tr style={{ backgroundColor: '#d0e8d0', fontWeight: 'bold' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <td style={{ textAlign: 'right', paddingRight: '10px' }}>Mean</td>
          <td>{means.hits}</td>
          <td>{means.misses}</td>
          <td>{means.falseAlarms}</td>
          <td>{means.correctRejects}</td>
          <td>{means.hitRate}</td>
          <td>{means.falseAlarmRate}</td>
          <td>{means.dPrimeHuman}</td>
          <td>{means.dPrimeAI}</td>
          <td>{means.dPrimeTeam}</td>
          <td>{means.dPrimeTeamSimple}</td>
        </motion.tr>
      </tbody>
    </motion.table>
  );
}
