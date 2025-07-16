import React from 'react';

interface Trial {
  index: number;
  color: number;
  sliderValue: number;
  aiGuessValue?: number;
  buttonPressed?: string;
  dPrimeTeam?: number;
}

interface ResultsTableProps {
  data: Trial[];
}

const ResultsTable = ({ data }: ResultsTableProps) => {
  const columns = ['index', 'color', 'sliderValue', 'aiGuessValue', 'buttonPressed', 'dPrimeTeam'];

  return (
    <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ textAlign: 'left' }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col}>{entry[col as keyof Trial] !== undefined ? String(entry[col as keyof Trial]) : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
