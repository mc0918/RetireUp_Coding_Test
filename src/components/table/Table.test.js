import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table", () => {
  test("All table rows appear on initial render", () => {
    const { container } = render(<Table />);
    expect(container).toBeInTheDocument();
  });

  test("Table rows sorted in ascending order", () => {
    render(<Table />);

    const rows = screen.getAllByRole("row");
    const firstYear = rows[1].querySelectorAll("td")[0].innerHTML;
    expect(firstYear).toEqual("1926");

    const lastYear = rows[rows.length - 1].querySelectorAll("td")[0].innerHTML;
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
