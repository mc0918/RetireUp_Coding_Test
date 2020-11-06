import { useEffect, useState } from "react";
import "./Table.css";
import * as returns from "../../assets/returns.json";
/*
 DELETE THIS AND ADD TO README
 could dynamically import returns and avoid state but this follows more established patterns for working with API calls and/or state management like redux
 plus, static imports that are small mean better performance according to React docs
*/
const calculateCumulativeReturn = (data) => {
  let initialReturn = parseFloat(data[data.length - 1].totalReturn);
  let currentReturn;
  let cumulativeReturn;
  console.log(data[0]);
  console.log(initialReturn);
  return data.map((d) => {
    currentReturn = parseFloat(d.totalReturn);
    cumulativeReturn = ((currentReturn - initialReturn) / initialReturn) * 100;
    return { ...d, cumulativeReturn: cumulativeReturn };
  });
};

//((d.totalReturn - startRow.totalReturn) / startRow.totalReturn)

export const Table = () => {
  const [rows, setRows] = useState([]);

  // empty array passed as second argument so useEffect only runs once in case of multiple renders (S&P 500 Total Returns won't change)
  useEffect(() => {
    setRows(calculateCumulativeReturn(returns.default));
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
    let header = ["Year", "Total Return", "Cumulative Return"];
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
