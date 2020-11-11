import { render, screen, cleanup } from "@testing-library/react";
import Table from "./Table";

afterEach(cleanup);

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
  let sliderHandleOne;
  let sliderHandleTwo;

  test("slider appears on initial render", () => {
    render(<Table />);
    sliderHandleOne = screen.getAllByRole("slider")[0];
    sliderHandleTwo = screen.getAllByRole("slider")[1];
    expect(sliderHandleOne).toBeInTheDocument();
    expect(sliderHandleTwo).toBeInTheDocument();
  });

  test("slider has initial values equal to min and max years of data", () => {
    const { container } = render(<Table />);

    const sliderHandles = container.querySelectorAll(".rc-slider-handle");
    const valueOne = sliderHandles[0].getAttribute("aria-valuenow");
    const valueTwo = sliderHandles[1].getAttribute("aria-valuenow");

    expect(sliderHandles.length).toEqual(2);
    expect(valueOne).toEqual("1926");
    expect(valueTwo).toEqual("2019");
  });

  // test("Adjusting slider changes table to show specified years", () => {
  //   expect(true).toBeFalsy();
  // });

  // test("Adjusting slider causes cumulative returns to update", () => {
  //   expect(true).toBeFalsy();
  // });
});
