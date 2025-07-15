import React from 'react';

const DecisionTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 text-center w-full max-w-md mx-auto">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2"></th>
            <th className="border border-gray-400 p-2">Umentschieden</th>
            <th className="border border-gray-400 p-2">Geblieben</th>
            <th className="border border-gray-400 p-2">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-green-100">
            <td className="border border-gray-400 p-2 font-semibold">Korrekt</td>
            <td className="border border-gray-400 p-2">13%</td>
            <td className="border border-gray-400 p-2">77%</td>
            <td className="border border-gray-400 p-2">90%</td>
          </tr>
          <tr className="bg-orange-100">
            <td className="border border-gray-400 p-2 font-semibold">Fälschlich</td>
            <td className="border border-gray-400 p-2">3%</td>
            <td className="border border-gray-400 p-2">7%</td>
            <td className="border border-gray-400 p-2">10%</td>
          </tr>
          <tr className="font-bold">
            <td className="border border-gray-400 p-2">Gesamt</td>
            <td className="border border-gray-400 p-2">16%</td>
            <td className="border border-gray-400 p-2">84%</td>
            <td className="border border-gray-400 p-2">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DecisionTable;