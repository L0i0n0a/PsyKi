import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface MatchSummary {
  [participant: string]: {
    totalComparisons: number;
    matches: number;
    mismatches: number;
    matchPercentage: number;
  };
}

interface Props {
  data: MatchSummary;
}

export default function AISliderMatchChart({ data }: Props) {
  const chartData = Object.entries(data).map(([, stats], index) => ({
    participant: `tN${index + 1}`,
    matches: stats.matches,
    mismatches: stats.mismatches,
  }));

  return (
    <div className="w-full h-[400px]">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Mensch vs. KI – Übereinstimmung pro Teilnehmende
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="participant">
            <Label value="Teilnehmende" offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis label={{ value: "Anzahl", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar dataKey="matches" stackId="a" fill="#34d399" name="Übereinstimmungen" />
          <Bar dataKey="mismatches" stackId="a" fill="#f87171" name="Unterschiede" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
