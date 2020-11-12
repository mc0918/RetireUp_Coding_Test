import { useState } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Row from "../row/Row";
import "./Table.css";
import * as returns from "../../assets/returns.json";

function calculateCumulativeReturn(tableData) {
  let initialReturn = parseFloat(tableData[0].totalReturn);
  let currentReturn;
  let cumulativeReturn;

  return tableData.map((d) => {
    currentReturn = parseFloat(d.totalReturn);
    cumulativeReturn = Math.abs(
      ((currentReturn - initialReturn) / initialReturn) * 100
    ).toFixed(2);
    if (currentReturn < initialReturn) {
      cumulativeReturn = -cumulativeReturn;
    }
    return { ...d, cumulativeReturn: cumulativeReturn };
  });
}

const Table = () => {
  const rows = calculateCumulativeReturn(returns.default).reverse();
  const initialState = {
    minYear: rows[0].year,
    maxYear: rows[rows.length - 1].year,
  };
  const [yearRange, setYearRange] = useState(initialState);

  const handleChange = (event) => {
    setYearRange({ minYear: event[0], maxYear: event[1] });
  };

  // separating Row into its own component allows for addition of new columns via props
  const renderTable = () => {
    let updatedRows = rows.filter(
      (row) => row.year >= yearRange.minYear && row.year <= yearRange.maxYear
    );

    if (updatedRows.length > 0) {
      updatedRows = calculateCumulativeReturn(updatedRows);
    }

    return updatedRows.map((row) => {
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

  const renderTableHeader = () => {
    let header = ["Year", "Total Return", "Cumulative Return (%)"];
    return header.map((label) => {
      return <th key={label}>{label}</th>;
    });
  };

  return (
    <>
      <div id="slider-container">
        <label>Select years to view</label>
        <Range
          min={initialState.minYear}
          max={initialState.maxYear}
          defaultValue={[initialState.minYear, initialState.maxYear]}
          onChange={(event) => handleChange(event)}
        />
        {/* React 17 and rc-slider's tooltip API cause problems when mousing over the handle, likely due to findDomNode's deprecation/lifecycles with functional components*/}
        <label className="label-text slider-label">{yearRange.minYear}</label>
        <label className="label-text slider-label" style={{ float: "right" }}>
          {yearRange.maxYear}
        </label>
      </div>
      <div id="table-container">
        <label>
          <h3 className="label-text">{"S&P 500 Returns By Year"}</h3>
        </label>
        <table id="returns">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTable()}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
