import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

describe("Table", () => {
  test("All table rows appear on initial render", () => {
    render(<Table />);

    const firstRow = screen.getByText(/1926/i);
    const lastRow = screen.getByText(/2019/i);
    expect(firstRow).toBeInTheDocument();
    expect(lastRow).toBeInTheDocument();
  });

  test("Table rows sorted in ascending order", () => {
    const { container } = render(<Table />);
    const tableHtml = container.querySelectorAll("tr");

    const firstYear = tableHtml[1].querySelectorAll("td")[0].innerHTML;
    expect(firstYear).toEqual("1926");

    const lastYear = tableHtml[tableHtml.length - 1].querySelectorAll("td")[0]
      .innerHTML;
    expect(lastYear).toEqual("2019");
  });
});

describe("Range Slider", () => {
  test("slider appears on initial render", () => {
    expect(true).toBeFalsy();
  });

  test("Adjusting slider changes table to show specified years", () => {
    expect(true).toBeFalsy();
  });

  test("Adjusting slider causes cumulative returns to update", () => {
    expect(true).toBeFalsy();
  });
});
