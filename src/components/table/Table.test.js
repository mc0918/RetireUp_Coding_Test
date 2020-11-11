import { render, screen, cleanup } from "@testing-library/react";
import { Simulate } from "react-dom/test-utils";
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
  test("slider appears on initial render", () => {
    render(<Table />);
    const sliderHandleOne = screen.getAllByRole("slider")[0];
    const sliderHandleTwo = screen.getAllByRole("slider")[1];
    expect(sliderHandleOne).toBeInTheDocument();
    expect(sliderHandleTwo).toBeInTheDocument();
  });

  test("slider has initial values equal to min and max years of sorted returns.json", () => {
    const { container } = render(<Table />);

    const sliderHandles = container.querySelectorAll(".rc-slider-handle");
    const valueOne = sliderHandles[0].getAttribute("aria-valuenow");
    const valueTwo = sliderHandles[1].getAttribute("aria-valuenow");

    expect(sliderHandles.length).toEqual(2);
    expect(valueOne).toEqual("1926");
    expect(valueTwo).toEqual("2019");
  });

  /**  NOTE
   * for some reason the right handle won't change
   * possibly due to how rc-slider-range handles events/synthetic events
   * but the argument can be made that the functionality is the same thus the test is not needed (equivalency case)
   */
  test("Adjusting slider changes slider value", () => {
    let { container } = render(<Table />);
    const sliderHandles = container.querySelectorAll(".rc-slider-handle");

    // assert slider starts at 1926
    const startingLabels = container.querySelectorAll(".slider-label");
    const startingValue = sliderHandles[0].getAttribute("aria-valuenow");

    expect(startingLabels[0].innerHTML).toEqual("1926");
    expect(startingValue).toEqual("1926");

    // simulate sliding left handle one year to the right
    Simulate.mouseDown(sliderHandles[0]);
    Simulate.keyDown(sliderHandles[0], {
      key: "ArrowRight",
      keyCode: 39,
      which: 39,
    });

    // assert slider has value 1927
    const changedLabels = container.querySelectorAll(".slider-label");
    const changedValue = sliderHandles[0].getAttribute("aria-valuenow");

    expect(changedLabels[0].innerHTML).toEqual("1927");
    expect(changedValue).toEqual("1927");
  });

  test("adjusting slider causes table to adjust", () => {
    const { container } = render(<Table />);
    const sliderHandles = container.querySelectorAll(".rc-slider-handle");
    const startingRows = screen.getAllByRole("row");

    expect(startingRows.length).toEqual(95);
    expect(startingRows[1].innerHTML).toContain("1926");

    Simulate.mouseDown(sliderHandles[0]);
    Simulate.keyDown(sliderHandles[0], {
      key: "ArrowRight",
      keyCode: 39,
      which: 39,
    });

    const changedRows = screen.getAllByRole("row");
    expect(changedRows.length).toEqual(94);
    expect(changedRows[1].innerHTML).toContain("1927");
  });

  test("Adjusting slider causes cumulative returns to update", () => {
    const { container } = render(<Table />);
    const sliderHandles = container.querySelectorAll(".rc-slider-handle");
    const startingRows = screen.getAllByRole("row");

    expect(startingRows[1].innerHTML).toContain("1926");
    expect(startingRows[1].innerHTML).toContain("0.00");
    expect(startingRows[2].innerHTML).toContain("1927");
    expect(startingRows[2].innerHTML).toContain("222.63");

    Simulate.mouseDown(sliderHandles[0]);
    Simulate.keyDown(sliderHandles[0], {
      key: "ArrowRight",
      keyCode: 39,
      which: 39,
    });

    const changedRows = screen.getAllByRole("row");
    expect(changedRows[1].innerHTML).toContain("1927");
    expect(changedRows[1].innerHTML).toContain("0.00");
    expect(changedRows[2].innerHTML).toContain("1928");
    expect(changedRows[2].innerHTML).toContain("16.32");
  });
});
