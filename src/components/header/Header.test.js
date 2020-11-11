import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Component renders", () => {
  const { container } = render(<Header />);
  expect(container).toBeInTheDocument();
  expect(screen.getByText(/RetireUp/i)).toBeInTheDocument();
});
