import { useEffect, useState } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Row from "../row/Row";
import "./Table.css";
import * as returns from "../../assets/returns.json";

/*
 DELETE THIS AND ADD TO README
 could dynamically import returns and avoid state but this follows more established patterns for working with API calls and/or state management like redux
 plus, static imports that are small mean better performance according to React docs
*/

//will take another argument for start year that user wants
function calculateCumulativeReturn(tableData) {
  let initialReturn = parseFloat(tableData[0].totalReturn);
  let currentReturn;
  let cumulativeReturn;

  return tableData.map((d) => {
    currentReturn = parseFloat(d.totalReturn);
    cumulativeReturn = (
      ((currentReturn - initialReturn) / initialReturn) *
      100
    ).toFixed(2);
    return { ...d, cumulativeReturn: cumulativeReturn };
  });
}

export const Table = () => {
  const [rows, setRows] = useState([]);
  const [yearRange, setYearRange] = useState({ start: 0, end: 0 }); // TODO: make this useReducer instead?

  // empty array passed as second argument so useEffect only runs once in case of multiple renders (S&P 500 Total Returns won't change)
  useEffect(() => {
    setRows(calculateCumulativeReturn(returns.default.reverse()));
  }, []);

  // separating rows into new component allows for addition of new columns
  const renderTable = () => {
    return rows.map((row) => {
      const { year, totalReturn, cumulativeReturn } = row;
      return (
        <tr key={year}>
          <Row
            year={year}
            totalReturn={totalReturn}
            cumulativeReturn={cumulativeReturn}
          />
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
      <Slider />
      <Range />
    </div>
  );
};
