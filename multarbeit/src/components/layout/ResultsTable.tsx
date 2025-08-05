import React from 'react';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Interface for individual trial data structure
 *
 * Represents a single decision trial in the research experiment,
 * containing participant responses, AI predictions, and performance metrics.
 */
interface Trial {
  /** Trial sequence number for chronological ordering */
  index: number;
  /** Correct color category (0 or 1) representing ground truth */
  color: number;
  /** Participant's slider response value (-100 to +100 scale) */
  sliderValue: number;
  /** AI model's confidence prediction for the trial (optional) */
  aiGuessValue?: number;
  /** Participant's final binary decision (blue/orange, optional) */
  buttonPressed?: string;
  /** Calculated d-prime value for team performance (optional) */
  dPrimeTeam?: number;
}

/**
 * Props interface for the ResultsTable component
 *
 * Defines the data structure required to render the trial results table.
 */
interface ResultsTableProps {
  /** Array of trial data objects to be displayed in the table */
  data: Trial[];
}

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * ResultsTable Component
 *
 * Renders a comprehensive data table displaying trial information for
 * detailed research analysis. The table shows all available data fields
 * in a structured format with proper styling and safe value handling.
 *
 * @param {ResultsTableProps} props - Component properties containing trial data
 * @returns {React.FC} Rendered table with comprehensive trial information
 */
const ResultsTable = ({ data }: ResultsTableProps) => {
  /* ========================================
     TABLE CONFIGURATION
     ======================================== */

  /**
   * Column definitions for the results table
   *
   * Defines the order and selection of data fields to be displayed.
   * Each column corresponds to a key field in the Trial interface.
   */
  const columns = ['index', 'color', 'sliderValue', 'aiGuessValue', 'buttonPressed', 'dPrimeTeam'];

  return (
    <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', width: '100%' }} role='table' aria-label='Detailed trial results for research analysis'>
      {/* ========================================
          TABLE HEADER
          ======================================== */}
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} style={{ textAlign: 'left' }} scope='col'>
              {col}
            </th>
          ))}
        </tr>
      </thead>

      {/* ========================================
          TABLE BODY - TRIAL DATA ROWS
          ======================================== */}
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col}>
                {/* Safe value rendering with fallback for undefined data */}
                {entry[col as keyof Trial] !== undefined ? String(entry[col as keyof Trial]) : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
