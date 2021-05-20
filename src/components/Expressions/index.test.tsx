import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { baseExpressionSet, Expressions } from '.';

it('should render the select options with the base expression set as default', () => {
  render(
    <Expressions
      expressionSet={baseExpressionSet}
      setExpressionSet={jest.fn()}
    />
  );

  const select = screen.getByTestId('select');
  const inputExpressions = screen.getByTestId('input-expressions');
  const outputExpressions = screen.getByTestId('output-expressions');

  expect(select).toHaveValue('base');
  expect(inputExpressions).toBeInTheDocument();
  expect(outputExpressions).toBeInTheDocument();
});

it('should select a different expression set', () => {
  const setExpression = jest.fn();
  render(
    <Expressions
      expressionSet={baseExpressionSet}
      setExpressionSet={setExpression}
    />
  );

  const select = screen.getByTestId('select');
  userEvent.selectOptions(select, 'custom1');

  expect(setExpression).toHaveBeenCalled();
});
