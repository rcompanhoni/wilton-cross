import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ExpressionSet, Input } from '../../lib/types';
import { Result } from '.';

const baseExpressionSet: ExpressionSet = {
  name: 'base',
  inputExpressionSet: [
    'A && B && !C => H = M',
    'A && B && C => H = P',
    '!A && B && C => H = T',
  ],
  outputExpressionSet: [
    'H = M => K = D + (D * E / 10)',
    'H = P => K = D + (D * (E - F) / 25.5)',
    'H = T => K = D - (D * F / 30)',
  ],
};

it('should block the button while no input is provided', () => {
  const invalidInput: Input = {
    a: false,
    b: false,
    c: false,
    d: undefined,
    e: undefined,
    f: undefined,
    hasError: false,
  };

  render(<Result input={invalidInput} expressionSet={baseExpressionSet} />);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('disabled');
});

it('should evaluate the expressions', () => {
  const validInput: Input = {
    a: true,
    b: true,
    c: false,
    d: 1,
    e: 2,
    f: 3,
    hasError: false,
  };

  render(<Result input={validInput} expressionSet={baseExpressionSet} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const result = screen.getByTestId('result');
  expect(result).toBeInTheDocument();
});

it('should display an error message when there are no matches', () => {
  const inputNoMatch: Input = {
    a: false,
    b: false,
    c: false,
    d: 1,
    e: 2,
    f: 3,
    hasError: false,
  };

  render(<Result input={inputNoMatch} expressionSet={baseExpressionSet} />);

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const error = screen.getByTestId('error');
  expect(error).toBeInTheDocument();
  screen.debug();
});
