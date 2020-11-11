import { screen, render } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
  expect(screen.getByText(/S&P 500 Returns By Year/i)).toBeInTheDocument();
  expect(screen.getByText(/header/i)).toBeInTheDocument();
});
