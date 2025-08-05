import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

/* ========================================
   RESEARCH DATA DEFINITIONS
   ======================================== */

/**
 * Comparative research data structure
 *
 * Contains the key metrics for validating the current study against
 * the original Optimal Weighting research paper. Includes measured
 * participant performance and theoretical optimal values.
 */
interface ComparisonData {
  /** Study identifier (Paper vs Current Study) */
  name: string;
  /** Measured d-prime sensitivity value from participants */
  Gemessen: number;
  /** Theoretical Optimal Weighting d-prime value */
  OW: number;
  /** Calculated difference between optimal and measured values */
  Differenz: number;
}

/**
 * Research comparison dataset
 *
 * Comparative metrics between the original research paper and current study:
 * - Paper: Original study with d' = 2.8 measured, OW = 3.8 optimal
 * - Current Study: Our replication with d' = 2.94 measured, OW = 3.74 optimal
 *
 * The similarity in values validates our implementation and methodology.
 */
const data: ComparisonData[] = [
  {
    name: 'Paper',
    Gemessen: 2.8,
    OW: 3.8,
    Differenz: 3.8 - 2.8, // Δ = 1.0
  },
  {
    name: 'Unsere Studie',
    Gemessen: 2.94,
    OW: 3.74,
    Differenz: 3.74 - 2.94, // Δ = 0.8
  },
];

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 *  Values Comparison Component
 *
 * Renders a comparative bar chart visualization showing the validation
 * of the current study against the original Optimal Weighting research.
 * Displays measured participant performance versus theoretical optimal
 * values to demonstrate research consistency and methodology validity.
 *
 * The chart features three data series:
 * - Blue bars: Measured d-prime values from actual participants
 * - Orange bars: Theoretical Optimal Weighting d-prime benchmarks
 * - Red labels: Difference calculations showing performance gaps
 *
 * @returns {React.FC} Rendered comparative bar chart for research validation
 */
export default function WerteVergleich() {
  return (
    <div className='flex flex-col gap-4 p-4 items-start'>
      <p className='text-xl font-semibold'>Werte-Vergleich zum Paper</p>
      <div className='w-[700px] h-[350px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barCategoryGap={30}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Legend />
            {/* Actual bar - foreground */}
            <Bar dataKey='Gemessen' fill='#3b82f6' radius={[4, 4, 0, 0]}>
              <LabelList dataKey='Gemessen' position='insideTop' fill='#fff' />
            </Bar>
            {/* OW bar - background */}
            <Bar dataKey='OW' fill='#f59e0b' radius={[4, 4, 0, 0]}>
              <LabelList dataKey='OW' position='top' fill='#f59e0b' formatter={(v) => `OW: ${v}`} />
            </Bar>

            {/* Differenz as label above */}
            <Bar dataKey='Differenz' fill='transparent'>
              <LabelList dataKey='Differenz' fill='#ef4444' formatter={(v) => `Δ: ${(v as number).toFixed(2)}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
