'use client';

import React from 'react';
import rawData from '@/store/participants.json'; // adjust path as needed
import { analyzeParticipant } from '@/utils/analyzeParticipant';

interface Trial {
  index: number;
  color: number;
  sliderValue: number;
  timestamp: string;
  buttonPressed?: string;
  aiGuessValue?: number;
}

interface ParticipantResult {
  id: string;
  summary: ReturnType<typeof analyzeParticipant>['summary'];
}

const ParticipantsResults: React.FC = () => {
  const participants: ParticipantResult[] = Object.entries(rawData).map(([filename, trials]) => {
    const enrichedTrials = (trials as Trial[]).map((trial) => ({
      ...trial,
      buttonPressed: trial.sliderValue >= 0 ? 'blue' : 'orange',
      aiGuessValue: Math.random(), // Replace with actual model output if available
    }));

    const analysis = analyzeParticipant(enrichedTrials);

    return {
      id: filename.replace('.json', ''),
      summary: analysis.summary,
    };
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Teilnehmer-Ergebnisse</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Accuracy</th>
            <th className="border p-2">Hit Rate</th>
            <th className="border p-2">FA Rate</th>
            <th className="border p-2">d′ Human</th>
            <th className="border p-2">d′ Aid</th>
            <th className="border p-2">d′ Team</th>
            <th className="border p-2">aHuman</th>
            <th className="border p-2">aAid</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.summary.accuracy}%</td>
              <td className="border p-2">{p.summary.hitRate}</td>
              <td className="border p-2">{p.summary.falseAlarmRate}</td>
              <td className="border p-2">{p.summary.dPrimeHuman}</td>
              <td className="border p-2">{p.summary.dPrimeAid}</td>
              <td className="border p-2">{p.summary.dPrimeTeam}</td>
              <td className="border p-2">{p.summary.aHuman}</td>
              <td className="border p-2">{p.summary.aAid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsResults;
