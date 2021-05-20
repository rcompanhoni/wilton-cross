import React, { useState } from 'react';
import { ExpressionSet } from '../../lib/types';
import './index.scss';

interface Props {
  expressionSet: ExpressionSet;
  setExpressionSet: (expressionSet: ExpressionSet) => void;
}

export const baseExpressionSet: ExpressionSet = {
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

const custom1ExpressionSet: ExpressionSet = {
  name: 'custom1',
  inputExpressionSet: baseExpressionSet.inputExpressionSet,
  outputExpressionSet: [
    baseExpressionSet.outputExpressionSet[0],
    'H = P => K = 2 * D + (D * E / 100)',
    baseExpressionSet.outputExpressionSet[2],
  ],
};

const custom2ExpressionSet: ExpressionSet = {
  name: 'custom2',
  inputExpressionSet: [
    'A && B && !C => H = T',
    ...baseExpressionSet.inputExpressionSet.slice(1),
    'A && !B && C => H = M',
  ],
  outputExpressionSet: [
    'H = M => K = F + D + (D * E / 100)',
    ...baseExpressionSet.outputExpressionSet.slice(1),
  ],
};

const expressionMap = new Map<string, ExpressionSet>([
  ['base', baseExpressionSet],
  ['custom1', custom1ExpressionSet],
  ['custom2', custom2ExpressionSet],
]);

export const Expressions = ({ expressionSet, setExpressionSet }: Props) => {
  const [selectedSetName, setSelectedSetName] = useState<string>('base');

  const onSetChange = (evt: React.FormEvent<EventTarget>) => {
    const target = evt.target as HTMLSelectElement;
    const selectedSet = target.value;
    setSelectedSetName(selectedSet);
    setExpressionSet(expressionMap.get(selectedSet) || baseExpressionSet);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title is-4">Expressions</h3>

        <label className="label">Please, select a set of expressions</label>
        <div className="select">
          <select value={expressionSet.name} onChange={onSetChange}>
            <option value="base">Base</option>
            <option value="custom1">Custom 1</option>
            <option value="custom2">Custom 2</option>
          </select>
        </div>

        <div className="expression-container">
          <div className="message is-primary">
            <div className="message-body">
              <ul>
                {expressionMap
                  .get(selectedSetName)
                  ?.inputExpressionSet.map((expression: string) => (
                    <li key={expression}>{expression}</li>
                  ))}
                <li>{`[other] => [error]`}</li>
              </ul>
            </div>
          </div>

          <div className="message is-info">
            <div className="message-body">
              <ul>
                {expressionMap
                  .get(selectedSetName)
                  ?.outputExpressionSet.map((expression: string) => (
                    <li key={expression}>{expression}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
