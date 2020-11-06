import { useEffect, useState } from "react";
import "./Table.css";
import * as returns from "../../assets/returns.json";
/*
 DELETE THIS AND ADD TO README
 could dynamically import returns and avoid state but this follows more established patterns for working with API calls and/or state management like redux
 plus, static imports that are small mean better performance according to React docs
*/

//will take another argument for start year that user wants
const calculateCumulativeReturn = (tableData) => {
  let initialReturn = parseFloat(tableData[0].totalReturn);
  let currentReturn;
  let cumulativeReturn;
  
  return tableData.map((d) => {
    currentReturn = parseFloat(d.totalReturn);
    cumulativeReturn = (((currentReturn - initialReturn) / initialReturn) * 100).toFixed(2);
    return { ...d, cumulativeReturn: cumulativeReturn };
  });
};

export const Table = () => {
  const [rows, setRows] = useState([]);

  // empty array passed as second argument so useEffect only runs once in case of multiple renders (S&P 500 Total Returns won't change)
  useEffect(() => {
    
    setRows(calculateCumulativeReturn(returns.default.reverse()));
  }, []);

  const renderTable = () => {
    return rows.map((row, index) => {
      const { year, totalReturn, cumulativeReturn } = row;
      return (
        <tr key={year}>
          <td>{year}</td>
          <td>{totalReturn}</td>
          <td>{cumulativeReturn}</td>
        </tr>
      );
    });
  };

  const renderHeader = () => {
    let header = ["Year", "Total Return", "Cumulative Return (%)"];
    return header.map((label) => {
      return <th key={label}>{label}</th>;
    });
  };

  return (
    <div>
      <table id="returns">
        <tbody>
          <tr>{renderHeader()}</tr>
          {renderTable(rows)}
        </tbody>
      </table>
    </div>
  );
};
