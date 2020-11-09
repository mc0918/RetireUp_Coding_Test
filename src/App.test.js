import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App and child components', () => {
  render(<App />);
  const tableText = screen.getByText(/S&P 500 Returns By Year/i);
  const headerText = screen.getByText(/header/i);
  expect(tableText).toBeInTheDocument();
  expect(headerText).toBeInTheDocument();
});
