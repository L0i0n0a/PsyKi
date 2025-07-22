import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const data = [
  {
    name: 'Paper',
    Gemessen: 2.8,
    OW: 3.8,
  },
  {
    name: 'Unsere Studie',
    Gemessen: 2.94,
    OW: 3.74,
  },
];

export default function WerteVergleich() {
  return (
    <div className="flex flex-col gap-4 p-4 items-start">
      <p className="text-xl font-semibold">Werte-Vergleich zum Paper</p>
      <div className="w-[700px] h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barCategoryGap={30}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Legend />
            {/* Actual bar - foreground */}
            <Bar dataKey="Gemessen" fill="#3b82f6" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="Gemessen" position="insideTop" fill="#fff" />
            </Bar>
            {/* OW bar - background */}
            <Bar dataKey="OW" fill="#f59e0b" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="OW" position="top" fill="#f59e0b" formatter={(v) => `OW: ${v}`} />
            </Bar>
            
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
