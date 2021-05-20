import React, { useState } from 'react';
import { baseExpressionSet, Expressions } from './Expressions';
import { Inputs } from './Inputs';
import { Result } from './Result';
import { ExpressionSet, Input, State } from '../lib/types';
import './index.scss';

const initialState: State = {
  input: {
    a: false,
    b: false,
    c: false,
    d: undefined,
    e: undefined,
    f: undefined,
    hasError: true,
  },
  expressionSet: baseExpressionSet,
};

export const App = () => {
  const [state, setState] = useState<State>(initialState);

  const setInput = (input: Input) => {
    setState({
      ...state,
      input,
    });
  };

  const setExpressionSet = (expressionSet: ExpressionSet) => {
    setState({
      ...state,
      expressionSet,
    });
  };

  return (
    <div className="container">
      <div data-testid="instructions" className="instructions">
        <h1 className="title">
          Front End Engineer Assessment - Rafael Companhoni
        </h1>
        <h2 className="subtitle">Instructions:</h2>
        <ol>
          <li>
            At the <strong>Expressions</strong> card, select the set of
            expressions to be considered.
          </li>
          <li>
            At the <strong>Inputs</strong> card, provide all the input values.
          </li>
          <li>
            Verify the results by clicking on the 'Evaluate' button at the{' '}
            <strong>Result</strong> card.
          </li>
        </ol>
      </div>

      <div className="columns has-same-height">
        <div data-testid="expressions" className="column">
          <Expressions
            expressionSet={state.expressionSet}
            setExpressionSet={setExpressionSet}
          />
        </div>
        <div data-testid="inputs" className="column">
          <Inputs input={state.input} setInput={setInput} />
        </div>
        <div data-testid="result" className="column">
          <Result input={state.input} expressionSet={state.expressionSet} />
        </div>
      </div>
    </div>
  );
};
