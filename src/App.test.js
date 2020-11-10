import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const {container} = render(<App />);
  // const tableText = container.screen.getByText(/S&P 500 Returns By Year/i);
  // const headerText = screen.getByText(/header/i);
  // expect(tableText).toBeInTheDocument();
  // expect(headerText).toBeInTheDocument();

  expect(container).toBeInTheDocument();
});
