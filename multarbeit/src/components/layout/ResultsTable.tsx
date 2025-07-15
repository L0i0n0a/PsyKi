import React from "react";

const ResultsTable = ({ data }) => {
  const columns = [
    "index",
    "color",
    "sliderValue",
    "aiGuessValue",
    "buttonPressed",
    "dPrimeTeam",
  ];

  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ textAlign: "left" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col}>{entry[col] !== undefined ? entry[col].toString() : ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
