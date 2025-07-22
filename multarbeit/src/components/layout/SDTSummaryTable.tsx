import React from 'react';
import { motion } from 'framer-motion';
import { computeSDTfromTrialsButton } from '@/utils/analyzeParticipant';

interface Trial {
  index: number;
  color: number;
  sliderValue: number;
  timestamp: string;
  buttonPressed?: string;
  aiGuessValue?: number;
}

type ParticipantData = {
  [participantId: string]: Trial[];
};

type SDTSummaryTableProps = {
  participantData: ParticipantData;
};

export default function SDTSummaryTable({ participantData }: SDTSummaryTableProps) {
  const participantEntries = Object.entries(participantData);
  // Map from filtered index to original tN number
  const filteredEntriesWithOriginalIdx = participantEntries
    .map(([participantId, trials], idx) => ({ participantId, trials, originalIdx: idx }))
    .filter(({ trials }) => {
      const results = computeSDTfromTrialsButton(trials);
      const dPrimeHuman = parseFloat(results.dPrimes.human);
      return dPrimeHuman >= 1;
    });

  const numIncluded = filteredEntriesWithOriginalIdx.length;

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

  const rows = filteredEntriesWithOriginalIdx.map(({ participantId, trials, originalIdx }, idx) => {
    const results = computeSDTfromTrialsButton(trials);
    const { counts, rates, dPrimes } = results;

    const hitRate = parseFloat(rates.hitRate);
    const faRate = parseFloat(rates.falseAlarmRate);
    const dHuman = parseFloat(dPrimes.human);
    const dAI = parseFloat(dPrimes.ai);
    const dTeam = parseFloat(dPrimes.team);
    const dTeamSimple = parseFloat(dPrimes.teamSimple);

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

  return (
    <motion.table
      border={1}
      cellPadding={10}
      style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}>
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
      <tbody>
        {rows}
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
