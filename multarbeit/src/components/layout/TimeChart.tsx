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

type TimeDifferenceData = {
  participant: string;
  totalTimeMinutes: number | null;
  learningChangeMs: number | null;
};

interface Props {
  data: { [key: string]: { totalTime: number | null; timeLearning: number | null } };
}

export default function TimeChart({ data }: Props) {
  // Format data for chart
const chartData: TimeDifferenceData[] = Object.entries(data).map(
  ([_, value], index) => ({
    participant: `tN${index + 1}`,
    totalTimeMinutes: value.totalTime !== null
      ? parseFloat((value.totalTime / (1000 * 60)).toFixed(2))
      : null,
    learningChangeMs: value.timeLearning !== null
      ? parseFloat((value.timeLearning / 1000).toFixed(2))
      : null,
  })
);


  return (
    <div className="w-full h-[400px]">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Zeitdifferenz & Lernverlauf der Teilnehmenden
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="participant">
            <Label value="Teilnehmende" offset={-30} position="insideBottom" />
          </XAxis>
          <YAxis
            yAxisId="left"
            label={{
              value: "Gesamtdauer (Minuten)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Lernverlauf (s)",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />

          <Bar
            yAxisId="left"
            dataKey="totalTimeMinutes"
            name="Gesamtdauer (Minuten)"
            fill="#8884d8"
          />
          <Bar
            yAxisId="right"
            dataKey="learningChangeMs"
            name="Lernverlauf (s)"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
