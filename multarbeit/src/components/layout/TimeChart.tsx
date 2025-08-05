import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for formatted chart data structure
 *
 * Represents the processed time data for each participant,
 * formatted specifically for Recharts visualization requirements.
 */
type TimeDifferenceData = {
  /** Participant identifier for chart display */
  participant: string;
  /** Total experiment duration converted to minutes */
  totalTimeMinutes: number | null;
  /** Learning progression time converted to seconds */
  learningChangeMs: number | null;
};

/**
 * Props interface for the TimeChart component
 *
 * Defines the raw time data structure received from parent components,
 * containing participant timing information for analysis.
 */
interface Props {
  /** Raw time data mapping participant keys to timing metrics */
  data: {
    [key: string]: {
      /** Total experiment time in milliseconds */
      totalTime: number | null;
      /** Learning phase time in milliseconds */
      timeLearning: number | null;
    };
  };
}

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * TimeChart - Temporal Analysis Visualization Component
 *
 * Creates a dual-axis bar chart displaying participant time metrics for
 * comprehensive temporal analysis in the PsyKi research study. Processes
 * raw timing data and presents it in an accessible, professional format.
 *
 * @param {Props} props - Component props containing raw time data
 * @returns {React.FC} Responsive dual-axis bar chart for temporal analysis
 */
export default function TimeChart({ data }: Props) {
  /* ----------------------------------------
     DATA PROCESSING AND FORMATTING
     ---------------------------------------- */

  /**
   * Format raw data for chart visualization
   *
   * Transforms the input data structure into chart-compatible format,
   * converting time units and creating participant labels for display.
   */
  const chartData: TimeDifferenceData[] = Object.entries(data).map(([, value], index) => ({
    // Generate sequential participant labels
    participant: `tN${index + 1}`,

    // Convert total time from milliseconds to minutes with precision
    totalTimeMinutes: value.totalTime !== null ? parseFloat((value.totalTime / (1000 * 60)).toFixed(2)) : null,

    // Convert learning time from milliseconds to seconds with precision
    learningChangeMs: value.timeLearning !== null ? parseFloat((value.timeLearning / 1000).toFixed(2)) : null,
  }));

  /* ----------------------------------------
     CHART COMPONENT RENDER
     ---------------------------------------- */

  return (
    <div className='w-full h-[400px]'>
      {/* Chart title with German research context */}
      <h3 className='text-xl font-semibold mb-4 text-gray-800'>Zeitdifferenz & Lernverlauf der Teilnehmenden</h3>

      {/* Responsive chart container */}
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
          {/* Chart grid for value reference */}
          <CartesianGrid strokeDasharray='3 3' />

          {/* X-axis configuration for participant labels */}
          <XAxis dataKey='participant'>
            <Label value='Teilnehmende' offset={-20} position='insideBottom' />
          </XAxis>

          {/* Left Y-axis for total time in minutes */}
          <YAxis
            yAxisId='left'
            label={{
              value: 'Gesamtdauer (Minuten)',
              angle: -90,
              position: 'insideLeft',
            }}
          />

          {/* Right Y-axis for learning progression in seconds */}
          <YAxis
            yAxisId='right'
            orientation='right'
            label={{
              value: 'Lernverlauf (s)',
              angle: 90,
              position: 'insideRight',
            }}
          />

          {/* Interactive tooltip for detailed information */}
          <Tooltip />

          {/* Legend for metric identification */}
          <Legend verticalAlign='top' />

          {/* Total duration bars (left axis, blue) */}
          <Bar yAxisId='left' dataKey='totalTimeMinutes' name='Gesamtdauer (Minuten)' fill='#8884d8' />

          {/* Learning progression bars (right axis, green) */}
          <Bar yAxisId='right' dataKey='learningChangeMs' name='Lernverlauf (s)' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
