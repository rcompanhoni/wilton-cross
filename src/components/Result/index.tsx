import React, { useState } from 'react';
import { Parser } from 'expr-eval';
import { Input, ExpressionSet } from '../../lib/types';

interface Props {
  input: Input;
  expressionSet: ExpressionSet;
}

export const Result = ({ input, expressionSet }: Props) => {
  const [matchingInputExp, setMatchingInputExp] = useState<string>('');
  const [matchingOutputExp, setMatchingOutputExp] = useState<string>('');
  const [k, setK] = useState<number>(-1);
  const [hasMatch, setHasMatch] = useState<boolean>(true);

  const canEvaluate = !input.hasError && input.d && input.e && input.f;
  const displayResults = canEvaluate && k !== -1;

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
          setMatchingInputExp(expression);
          const output = expressionVars[expressionVars.length - 1]
            .toLowerCase()
            .trim();
          return output;
        }

        return expressionH;
      },
      ''
    );

    if (h) {
      // gets matching expression for current 'h'
      const kExpression = expressionSet.outputExpressionSet.find((oexp) =>
        oexp.includes(h.toUpperCase())
      );
      setMatchingOutputExp(kExpression || '');

      // evaluate result using user input
      const kExpressionRight = kExpression?.split('K = ')[1];
      const k = Parser.evaluate(kExpressionRight || '', {
        D: input.d || 0,
        E: input.e || 0,
        F: input.f || 0,
      });

      setHasMatch(true);
      setK(k);
    } else {
      setHasMatch(false);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title is-4">Result</h3>

        <button
          className="button is-primary"
          onClick={evaluateExpression}
          disabled={!canEvaluate}
        >
          Evaluate
        </button>

        {displayResults && (
          <>
            {!hasMatch && (
              <div className="notification is-danger">
                Error: no matching expressions for the selected set.
              </div>
            )}

            {hasMatch && (
              <>
                <div className="field is-horizontal">
                  <label className="label">K</label>
                  <div className="control">
                    <input className="input" type="text" value={k} readOnly />
                  </div>
                </div>

                <h3 className="title is-4">Matching Expressions</h3>
                <ul>
                  <li>{matchingInputExp}</li>
                  <li>{matchingOutputExp}</li>
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
