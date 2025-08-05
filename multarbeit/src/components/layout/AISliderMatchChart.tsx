import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface defining the summary statistics for participant-AI matches
 *
 * Each participant's data includes comprehensive metrics about their
 * agreement with AI recommendations throughout the study.
 */
interface MatchSummary {
  [participant: string]: {
    /** Total number of comparisons made by this participant */
    totalComparisons: number;
    /** Number of times participant agreed with AI */
    matches: number;
    /** Number of times participant disagreed with AI */
    mismatches: number;
    /** Percentage of agreements (matches/totalComparisons * 100) */
    matchPercentage: number;
  };
}

/**
 * Props interface for the AISliderMatchChart component
 */
interface Props {
  /** Match summary data for all participants in the study */
  data: MatchSummary;
}

/* ========================================
   CHART COMPONENT
   ======================================== */

/**
 * AI Slider Match Chart Component
 *
 * Renders a stacked bar chart showing the distribution of matches and mismatches
 * between human participants and AI recommendations. Each bar represents one
 * participant, with green sections showing agreements and red sections showing
 * disagreements.
 *
 * The visualization helps researchers understand:
 * - Individual variation in human-AI agreement
 * - Overall patterns of trust and disagreement
 * - Effectiveness of the Optimal Weighting strategy
 *
 * @param {Props} props - Component properties
 * @param {MatchSummary} props.data - Participant match/mismatch data
 * @returns {JSX.Element} Responsive bar chart visualization
 */
export default function AISliderMatchChart({ data }: Props) {
  /* ========================================
     DATA TRANSFORMATION
     ======================================== */

  /**
   * Transform the match summary data into chart-compatible format
   *
   * Converts the participant data object into an array suitable for Recharts,
   * with anonymized participant labels (tN1, tN2, etc.) for privacy protection.
   */
  const chartData = Object.entries(data).map(([, stats], index) => ({
    participant: `tN${index + 1}`, // Anonymized participant identifier
    matches: stats.matches, // Green bars - agreements with AI
    mismatches: stats.mismatches, // Red bars - disagreements with AI
  }));

  /* ========================================
     RENDER
     ======================================== */

  return (
    <div className='w-full h-[400px]'>
      {/* Chart Title */}
      <h3 className='text-xl font-semibold mb-4 text-gray-800'>Mensch vs. KI – Übereinstimmung pro Teilnehmende</h3>

      {/* Responsive Chart Container */}
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          {/* Grid lines for better readability */}
          <CartesianGrid strokeDasharray='3 3' />

          {/* X-Axis: Participant identifiers */}
          <XAxis dataKey='participant'>
            <Label value='Teilnehmende' offset={-20} position='insideBottom' />
          </XAxis>

          {/* Y-Axis: Count of decisions */}
          <YAxis
            label={{
              value: 'Anzahl',
              angle: -90,
              position: 'insideLeft',
            }}
          />

          {/* Interactive tooltip showing exact values */}
          <Tooltip />

          {/* Legend explaining color coding */}
          <Legend verticalAlign='top' />

          {/* Matches Bar - Green color indicates agreement */}
          <Bar dataKey='matches' stackId='a' fill='#34d399' name='Übereinstimmungen' />

          {/* Mismatches Bar - Red color indicates disagreement */}
          <Bar dataKey='mismatches' stackId='a' fill='#f87171' name='Unterschiede' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
