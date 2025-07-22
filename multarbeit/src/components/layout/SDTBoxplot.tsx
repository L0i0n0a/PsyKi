import React from 'react';
import dynamic from 'next/dynamic';
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

type SDTBoxplotProps = {
  participantData: ParticipantData;
};

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false }) as React.ComponentType<{
  data: unknown[];
  layout: Record<string, unknown>;
  config: Record<string, unknown>;
}>;

// Helper to extract arrays for each metric
function extractMetricArrays(participantData: ParticipantData) {
  const dPrimeHuman: number[] = [];
  const dPrimeTeam: number[] = [];
  const dPrimeTeamSimple: number[] = [];
  let dPrimeAI: number | null = null;

  Object.values(participantData).forEach((trials) => {
    const results = computeSDTfromTrialsButton(trials);
    dPrimeHuman.push(parseFloat(results.dPrimes.human));
    dPrimeTeam.push(parseFloat(results.dPrimes.team));
    dPrimeTeamSimple.push(parseFloat(results.dPrimes.teamSimple));
    if (dPrimeAI === null) {
      dPrimeAI = parseFloat(results.dPrimes.ai);
    }
  });

  return {
    dPrimeHuman,
    dPrimeTeam,
    dPrimeTeamSimple,
    dPrimeAI,
  };
}

const metricLabels = [
  { key: 'dPrimeHuman', label: "d' Human" },
  { key: 'dPrimeTeam', label: "d' Team" },
  { key: 'dPrimeTeamSimple', label: "d' TeamSimple" },
] as const;

export default function SDTBoxplot({ participantData }: SDTBoxplotProps) {
  const { dPrimeHuman, dPrimeTeam, dPrimeTeamSimple, dPrimeAI } = extractMetricArrays(participantData);
  const metrics = { dPrimeHuman, dPrimeTeam, dPrimeTeamSimple };

  // Prepare data for Plotly boxplot
  const boxColors = ['#4848e9ff', '#1e8d95ff', '#08883dff']; // blue, turquoise, green
  const participantNumbers = Object.keys(participantData).map((_, i) => `${i + 1}`);
  const plotData = metricLabels.map(({ key, label }, i) => ({
    y: metrics[key as keyof typeof metrics],
    customdata: participantNumbers,
    type: 'box' as const,
    name: label,
    boxpoints: 'all' as const,
    jitter: 0.5,
    whiskerwidth: 0.2,
    fillcolor: boxColors[i],
    marker: { color: boxColors[i], outliercolor: '#e4572e', line: { outliercolor: '#e4572e', outlierwidth: 2 } },
    line: { color: '#222' },
    boxmean: true,
    hovertemplate: 'Wert: %{y}<br>Teilnehmer: %{customdata}<extra></extra>',
  }));

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: 24 }}>
      <Plot
        data={plotData}
        layout={{
          width: 900,
          height: 400,
          boxmode: 'group',
          yaxis: {
            title: 'Wert',
            zeroline: false,
          },
          xaxis: { title: 'Metrik', tickangle: -30 },
          margin: { l: 60, r: 30, t: 40, b: 80 },
          plot_bgcolor: '#f8fafc',
          paper_bgcolor: '#f8fafc',
          ...(dPrimeAI !== null
            ? {
                shapes: [
                  {
                    type: 'line',
                    xref: 'paper',
                    x0: 0,
                    x1: 1,
                    y0: dPrimeAI,
                    y1: dPrimeAI,
                    line: {
                      color: '#888',
                      width: 1.5,
                      dash: 'solid',
                    },
                  },
                ],
                annotations: [
                  {
                    xref: 'paper',
                    yref: 'y',
                    x: 1.08,
                    y: dPrimeAI,
                    text: `d' AI (${dPrimeAI})`,
                    showarrow: false,
                    font: { size: 13, color: '#444' },
                    align: 'left',
                    bgcolor: '#fff',
                    bordercolor: '#444',
                    borderpad: 2,
                    borderwidth: 1,
                  },
                ],
              }
            : {}),
        }}
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}
