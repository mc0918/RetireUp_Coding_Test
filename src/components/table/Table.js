import { useEffect, useState } from "react";
import * as returns from "../../assets/returns.json";

export const Table = () => {
  const [rows, setRows] = useState([]);

  // empty array passed as second argument so useEffect only runs once (S&P 500 Total Returns won't change)
  useEffect(() => {
    setRows(returns);
  }, []);

  return (
    <div>
      hi
      {console.log(rows)}
    </div>
  );
};
