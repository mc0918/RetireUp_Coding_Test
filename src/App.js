import Table from "./components/table/Table";
import Header from "./components/header/Header";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div id="page-container">
        <div className="flex-grid">
          <div className="flex-column-1">
            <div className="text-content">
              <h2 className="text-header">S&P 500 Total Returns</h2>
              <p>
                The total returns of the S&P 500 index are listed by year. Total
                returns include three components: the return generated by
                dividends, the return generated by price changes in the index,
                and the cumulative return calculated from the first year chosen
                on the slider.
              </p>
              <h3 className="text-header">How to use</h3>
              <p>
                Simply adjust the range slider's minimum and maximum values to
                see the total returns over the specified period of time. You
                will also see the cumulative returns change as they are being
                calculated dynamically, as mentioned above.
              </p>
            </div>
          </div>
          <div className="flex-column-2">
            <Table />
          </div>
          <div className="flex-column-2">
            <div className="text-content">
              <h3 className="text-header">Data Details</h3>
              <p>
                From{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.slickcharts.com/sp500/returns"
                >
                  Slickcharts:
                </a>{" "}
                "The S&P index returns start in 1926 when the index was first
                composed of 90 companies. The name of the index at that time was
                the Composite Index or S&P 90. In 1957 the index expanded to
                include the 500 components we now have today. The returns
                include both price returns and re-invested dividends."
              </p>
            </div>
            <div className="text-content">
              <h3 className="text-header">Project Details</h3>
              <p>
                This page is made using React, bootstrapped with
                create-react-app. Returns, downloaded as a JSON file, are passed
                to the Table component where operations are performed to sort
                them and calculate the cumulative return per year. Using the
                rc-slider package, users are able to filter the years displayed
                in the table to see only the years they want. Responsive styling
                was done with plain CSS, using flexbox to sort the page into
                rows and columns. Want to learn more? Visit the source code{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/mc0918/RetireUp_Coding_Test"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
