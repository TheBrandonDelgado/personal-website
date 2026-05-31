import { render, screen } from '@testing-library/react';
import App from './App.tsx';

test('renders the hero heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /brandon delgado/i });
  expect(heading).toBeInTheDocument();
});
