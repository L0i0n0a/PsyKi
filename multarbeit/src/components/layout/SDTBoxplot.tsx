import React from 'react';
import dynamic from 'next/dynamic';
import { computeSDTfromTrialsButton } from '@/utils/analyzeParticipant';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual trial data structure
 *
 * Represents a single decision trial containing participant responses
 * and system information needed for SDT calculations.
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
 * Props interface for the SDTBoxplot component
 *
 * Defines the data structure required to generate boxplot visualizations
 * of Signal Detection Theory metrics across participants.
 */
type SDTBoxplotProps = {
  /** Complete participant data with trial information */
  participantData: ParticipantData;
};

/* ========================================
   DYNAMIC IMPORTS AND CONFIGURATION
   ======================================== */

/**
 * Dynamically imported Plotly component
 *
 * Uses Next.js dynamic import to avoid server-side rendering issues
 * with the Plotly library, ensuring proper client-side rendering.
 */
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false }) as React.ComponentType<{
  data: unknown[];
  layout: Record<string, unknown>;
  config: Record<string, unknown>;
}>;

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Extracts metric arrays from participant data for visualization
 *
 * Processes all participant trial data to compute Signal Detection Theory
 * metrics and organizes them into arrays suitable for boxplot generation.
 * Calculates d-prime values for different decision-making strategies.
 *
 * @param participantData - Complete dataset of all participants and their trials
 * @returns Object containing arrays of d-prime values for each metric type
 */
function extractMetricArrays(participantData: ParticipantData) {
  // Initialize arrays for different d-prime metrics
  const dPrimeHuman: number[] = [];
  const dPrimeTeam: number[] = [];
  const dPrimeTeamSimple: number[] = [];
  let dPrimeAI: number | null = null;

  // Process each participant's trial data
  Object.values(participantData).forEach((trials) => {
    // Compute SDT metrics for current participant
    const results = computeSDTfromTrialsButton(trials);

    // Extract and store d-prime values
    dPrimeHuman.push(parseFloat(results.dPrimes.human));
    dPrimeTeam.push(parseFloat(results.dPrimes.team));
    dPrimeTeamSimple.push(parseFloat(results.dPrimes.teamSimple));

    // Store AI d-prime (same across all participants)
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

/* ========================================
   VISUALIZATION CONFIGURATION
   ======================================== */

/**
 * Metric labels configuration for boxplot visualization
 *
 * Defines the display labels and data keys for each Signal Detection Theory
 * metric type used in the comparative analysis visualization.
 */
const metricLabels = [
  { key: 'dPrimeHuman', label: "d' Human" },
  { key: 'dPrimeTeam', label: "d' Team" },
  { key: 'dPrimeTeamSimple', label: "d' TeamSimple" },
] as const;

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * SDTBoxplot - Signal Detection Theory Boxplot Visualization Component
 *
 * Creates interactive boxplot visualizations comparing d-prime values across
 * different decision-making strategies in the Optimal Weighting study.
 * Uses Plotly.js for advanced statistical visualization capabilities.
 *
 * @param props - Component props containing participant data
 * @returns JSX element with Plotly boxplot visualization
 */
export default function SDTBoxplot({ participantData }: SDTBoxplotProps) {
  /* ----------------------------------------
     DATA EXTRACTION AND PROCESSING
     ---------------------------------------- */

  // Extract d-prime metrics from all participant data
  const { dPrimeHuman, dPrimeTeam, dPrimeTeamSimple, dPrimeAI } = extractMetricArrays(participantData);

  // Organize metrics for visualization processing
  const metrics = { dPrimeHuman, dPrimeTeam, dPrimeTeamSimple };

  /* ----------------------------------------
     VISUALIZATION STYLING CONFIGURATION
     ---------------------------------------- */

  // Color scheme for different strategy boxplots
  const boxColors = ['#4848e9ff', '#1e8d95ff', '#08883dff']; // blue, turquoise, green

  // Generate participant number labels for hover information
  const participantNumbers = Object.keys(participantData).map((_, i) => `${i + 1}`);

  /* ----------------------------------------
     PLOTLY DATA CONFIGURATION
     ---------------------------------------- */

  /**
   * Boxplot data configuration for Plotly visualization
   *
   * Creates boxplot traces for each decision strategy with comprehensive
   * styling, hover information, and statistical display options.
   * Includes outlier detection and mean value indicators.
   */
  const plotData = metricLabels.map(({ key, label }, i) => ({
    // Data values and participant mapping
    y: metrics[key as keyof typeof metrics],
    customdata: participantNumbers,

    // Boxplot configuration
    type: 'box' as const,
    name: label,
    boxpoints: 'all' as const,
    jitter: 0.5,
    whiskerwidth: 0.2,

    // Visual styling
    fillcolor: boxColors[i],
    marker: {
      color: boxColors[i],
      outliercolor: '#e4572e',
      line: { outliercolor: '#e4572e', outlierwidth: 2 },
    },
    line: { color: '#222' },

    // Statistical indicators
    boxmean: true,

    // Hover information template (German)
    hovertemplate: 'Wert: %{y}<br>Teilnehmer: %{customdata}<extra></extra>',
  }));

  /* ----------------------------------------
     COMPONENT RENDER WITH PLOTLY
     ---------------------------------------- */

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: 24 }}>
      <Plot
        data={plotData}
        layout={{
          // Chart dimensions and grouping
          width: 900,
          height: 400,
          boxmode: 'group',

          // Y-axis configuration for d-prime values
          yaxis: {
            title: 'Wert',
            zeroline: false,
          },

          // X-axis configuration for strategy labels
          xaxis: {
            title: 'Metrik',
            tickangle: -30,
          },

          // Chart spacing and background
          margin: { l: 60, r: 30, t: 40, b: 80 },
          plot_bgcolor: '#f8fafc',
          paper_bgcolor: '#f8fafc',

          // Conditional AI reference line and annotation
          ...(dPrimeAI !== null
            ? {
                // Horizontal reference line for AI performance
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
                // AI value annotation
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
        config={{
          responsive: true,
          displayModeBar: false,
        }}
      />
    </div>
  );
}
