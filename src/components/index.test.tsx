import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '.';

it('renders the overall app structure', () => {
  render(<App />);
  const instructions = screen.getByTestId('instructions');
  const expressions = screen.getByTestId('expressions');
  const inputs = screen.getByTestId('inputs');
  const result = screen.getByTestId('result');

  expect(instructions).toBeInTheDocument();
  expect(expressions).toBeInTheDocument();
  expect(inputs).toBeInTheDocument();
  expect(result).toBeInTheDocument();
});
