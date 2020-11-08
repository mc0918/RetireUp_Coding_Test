import { useCallback, useEffect, useReducer, useState } from "react";
import { Range } from "rc-slider";
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

function reducer(state, action) {
  switch (action.type) {
    case "setMinYear":
      return { minYear: action.payload, maxYear: state.maxYear };
    case "setMaxYear":
      return { minYear: state.minYear, maxYear: action.payload };
    default:
      throw new Error();
  }
}

export const Table = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [yearRange, dispatch] = useReducer(reducer, { minYear: 0, maxYear: 0 });
  const setYearRange = useCallback((type, input) => {
    dispatch({ type: type, payload: input });
  }, []);

  const handleChange = (event) => {
    setYearRange("setMinYear", event[0]);
    setYearRange("setMaxYear", event[1]);
    let updatedRows = rows.filter(
      (row) => row.year >= yearRange.minYear && row.year <= yearRange.maxYear
    );
    setFilteredRows(updatedRows);
    console.log(filteredRows);
  };
  // empty array passed as second argument so useEffect only runs once in case of multiple renders (S&P 500 Total Returns won't change)
  useEffect(() => {
    const r = calculateCumulativeReturn(returns.default.reverse());
    setYearRange("setMinYear", 1926);
    setYearRange("setMaxYear", r[r.length - 1].year);
    setRows(r);
    setFilteredRows(r);
  }, [setYearRange]);

  // separating rows into new component allows for addition of new columns
  const renderTable = () => {
    return filteredRows.map((row) => {
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
    <div className="flex-grid">
      <div className="flex-column">
        <table id="returns">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTable(filteredRows)}
          </tbody>
        </table>
      </div>
      <div className="flex-column">
        <Range
          min={1926}
          max={2019}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </div>
  );
};
