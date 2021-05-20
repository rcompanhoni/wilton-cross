import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '../../lib/types';
import { Inputs } from '.';

const input: Input = {
  a: false,
  b: false,
  c: false,
  d: undefined,
  e: undefined,
  f: undefined,
  hasError: true,
};

it('should render the input expression form', () => {
  render(<Inputs input={input} setInput={jest.fn} />);

  const booleanOptions = screen.getAllByRole('checkbox');
  const floatInput = screen.getByPlaceholderText('Type a float value');
  const integerInputs = screen.getAllByPlaceholderText('Type an integer');

  expect(booleanOptions).toHaveLength(3);
  expect(floatInput).toBeInTheDocument();
  expect(integerInputs).toHaveLength(2);
});

it('should validate the input', () => {
  render(<Inputs input={input} setInput={jest.fn} />);

  const floatInput = screen.getByPlaceholderText('Type a float value');
  fireEvent.change(floatInput, { target: { value: 'ABC' } });

  const errorMessage = screen.getByText('Must be a float');
  expect(errorMessage).toBeInTheDocument();
});
