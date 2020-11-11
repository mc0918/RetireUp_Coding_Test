import { render, screen } from "@testing-library/react";
import Row from "./Row";

test("Row renders with provided props", () => {
  const [year, totalReturn, cumulativeReturn] = ["2000", "15", "8.0"];

  // table elements not necessarily needed but this prevents validateDOMNesting warnings (could also put //es-lint-disable-next-line before render)
  render(
    <table>
      <tbody>
        <tr>
          <Row
            year={year}
            totalReturn={totalReturn}
            cumulativeReturn={cumulativeReturn}
          />
        </tr>
      </tbody>
    </table>
  );
  const renderedYear = screen.getAllByRole("row")[0].querySelectorAll("td")[0]
    .innerHTML;
  const renderedTotal = screen.getAllByRole("row")[0].querySelectorAll("td")[1]
    .innerHTML;
  const renderedCumulative = screen
    .getAllByRole("row")[0]
    .querySelectorAll("td")[2].innerHTML;

  expect(screen.getByText(/2000/i)).toBeInTheDocument();
  expect(renderedYear).toEqual(year);
  expect(renderedTotal).toEqual(totalReturn);
  expect(renderedCumulative).toEqual(cumulativeReturn);
});
