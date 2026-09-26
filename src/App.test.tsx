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
  expect(stack).toHaveTextContent('Supabase');
  expect(stack).toHaveTextContent('Redis');
  expect(stack).toHaveTextContent('NestJS / Express');

  const resume = screen.getByRole('link', { name: /download resume/i });
  expect(resume).toHaveAttribute('href', '/Brandon-Delgado-Resume.pdf');
  expect(resume).toHaveAttribute('download', 'Brandon-Delgado-Resume.pdf');
  expect(resume).not.toHaveAttribute('target');
});

test('keeps product copy free of mining, Bitcoin, hashrate, and Python wording', () => {
  const { container } = render(<App />);
  const text = container.textContent ?? '';
  expect(text).not.toMatch(/\bmining\b/i);
  expect(text).not.toMatch(/bitcoin/i);
  expect(text).not.toMatch(/hashrate/i);
  expect(text).not.toMatch(/\bpython\b/i);
  expect(text).not.toMatch(/BMaaS|\bOCEAN\b|money rails/i);
});
