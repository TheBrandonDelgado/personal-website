import { render, screen } from '@testing-library/react';
import App from './App.tsx';

test('renders the hero heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /brandon delgado/i });
  expect(heading).toBeInTheDocument();
});

test('renders hero stack chips and a resume download', () => {
  render(<App />);

  const stack = screen.getByRole('list', { name: /core stack/i });
  expect(stack).toHaveTextContent('TypeScript');
  expect(stack).toHaveTextContent('React');
  expect(stack).toHaveTextContent('Node.js');
  expect(stack).toHaveTextContent('Postgres');
  expect(stack).toHaveTextContent('Redis');
  expect(stack).toHaveTextContent('NestJS / Express');

  const resume = screen.getByRole('link', { name: /download resume/i });
  expect(resume).toHaveAttribute('href', '/Brandon-Delgado-Resume.pdf');
  expect(resume).toHaveAttribute('download', 'Brandon-Delgado-Resume.pdf');
  expect(resume).not.toHaveAttribute('target');
});
