import { useCallback, useEffect, useReducer } from "react";
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

const ascendingReturns = returns.default.reverse();

const Table = () => {
  const rows = calculateCumulativeReturn(ascendingReturns);

  const [yearRange, dispatch] = useReducer(reducer, { minYear: 0, maxYear: 0 });
  const setYearRange = useCallback((type, input) => {
    dispatch({ type: type, payload: input });
  }, []);

  // dragging left slider to 1926 doesn't show row for 1926 until the right side is moved
  const handleChange = (event) => {
    setYearRange("setMinYear", event[0]);
    setYearRange("setMaxYear", event[1]);
  };
  // empty array passed as second argument so useEffect only runs once in case of multiple renders (S&P 500 Total Returns won't change)
  useEffect(() => {
    setYearRange("setMinYear", rows[0].year);
    setYearRange("setMaxYear", rows[rows.length - 1].year);
  }, [setYearRange]);

  // separating rows into new component allows for addition of new columns
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
    // this should be dynamically generated if everything else is...
    let header = ["Year", "Total Return", "Cumulative Return (%)"];
    return header.map((label) => {
      return <th key={label}>{label}</th>;
    });
  };

  return (
    <div className="flex-grid">
      <div className="flex-column">
        <div id="slider">
          <label>Select years to view</label>
          <Range
            min={1926}
            max={2019}
            defaultValue={[1926, 2019]}
            onChange={(event) => handleChange(event)}
          />
          {/* React 17 and rc-slider's tooltip API cause problems when mousing over the handle, likely due to findDomNode's deprecation/lifecycles with functional components*/}
          <label>{yearRange.minYear}</label>
          <label style={{ float: "right" }}>{yearRange.maxYear}</label>
        </div>
        <br />
        <div id="table">
          <label><h1>{"S&P 500 Returns By Year"}</h1></label>
          <table id="returns">
            <tbody>
              <tr>{renderTableHeader()}</tr>
              {renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
