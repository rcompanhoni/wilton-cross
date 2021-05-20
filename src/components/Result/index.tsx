import React from 'react';
import { Input, ExpressionSet } from '../../lib/types';

interface Props {
  input: Input;
  expressionSet: ExpressionSet;
}

export const Result = ({ input, expressionSet }: Props) => {
  const evaluateExpression = () => {
    const h = expressionSet.inputExpressionSet.reduce(
      (expressionH: string, expression: string) => {
        // parse expression into 'tokens'
        const expressionVars = expression
          .split(/[=>&&]/)
          .filter((v) => v !== '');

        // check if matches user input
        const match = expressionVars.slice(0, 3).every((eVar: string) => {
          const expectedValue = !eVar.includes('!');
          const inputField = eVar.replace('!', '').toLowerCase().trim();
          const inputValue = input[inputField as keyof Input];
          return inputValue === expectedValue;
        });

        // return the proper h value
        if (match) {
          const output = expressionVars[expressionVars.length - 1]
            .toLowerCase()
            .trim();
          return output;
        }

        return expressionH;
      },
      ''
    );

    console.log(`H VALUE IS ${h}`);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title is-4">Result</h3>
        <button className="button is-primary" onClick={evaluateExpression}>
          Evaluate
        </button>
      </div>
    </div>
  );
};
