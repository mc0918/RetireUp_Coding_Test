import { screen, render } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
  // header
  expect(screen.getByText(/RetireUp/i)).toBeInTheDocument();
  // App text
  expect(screen.getByText(/S&P 500 Returns/i)).toBeInTheDocument();
  // slider
  expect(screen.getByText(/Select years to view/i)).toBeInTheDocument();
  // table
  expect(screen.getByText(/S&P 500 Returns By Year/i)).toBeInTheDocument();
});
