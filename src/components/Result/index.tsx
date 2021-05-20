import React, { useState } from 'react';
import { Parser } from 'expr-eval';
import { Input, ExpressionSet } from '../../lib/types';
import './index.scss';

interface Props {
  input: Input;
  expressionSet: ExpressionSet;
}

export const Result = ({ input, expressionSet }: Props) => {
  const [matchingInputExp, setMatchingInputExp] = useState<string>('');
  const [matchingOutputExp, setMatchingOutputExp] = useState<string>('');
  const [k, setK] = useState<number>(-1);
  const [hasMatch, setHasMatch] = useState<boolean>(true);
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);

  const canEvaluate = !input.hasError && input.d && input.e && input.f;
  const displayResults = canEvaluate && hasAttempted;

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

    setHasAttempted(true);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title is-4">Result</h3>

        <div className="button-container">
          <button
            className="button is-primary"
            onClick={evaluateExpression}
            disabled={!canEvaluate}
          >
            Evaluate
          </button>
        </div>

        {displayResults && (
          <>
            {!hasMatch && (
              <div data-testid="error" className="error-container">
                <div className="notification is-danger">
                  Error: no matching expression for the provided input values.
                </div>
              </div>
            )}

            {hasMatch && (
              <div className="result-container">
                <div className="field is-horizontal">
                  <label className="label">K</label>
                  <div className="control">
                    <input
                      data-testid="result"
                      className="input"
                      type="text"
                      value={k}
                      readOnly
                    />
                  </div>
                </div>

                <h3 className="title is-4">Matching Expressions</h3>

                <div className="message is-success">
                  <div className="message-body">
                    <ul>
                      <li>{matchingInputExp}</li>
                      <li>{matchingOutputExp}</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
