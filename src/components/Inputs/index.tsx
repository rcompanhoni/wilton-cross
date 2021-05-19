import React from 'react';
import { Input } from '../../lib/types';

interface Props {
  input: Input;
  setInput: (input: Input) => void;
}

export const Inputs = ({ input, setInput }: Props) => {
  const onInputChange = (evt: React.FormEvent<EventTarget>) => {
    const target = evt.target as HTMLInputElement;
    const field = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(`FIELD: ${field} -- VALUE: ${value}`);

    setInput({
      ...input,
      [field]: value,
    });
  };

  const validate = (name: string, value: string) => {
    if (['d', 'e', 'f'].includes(name)) {
      return true; // TODO - mustn't be null && must be decimal
    }

    if (['m', 'p', 't'].includes(name)) {
      return true; // TODO - mustn't be null && must be a number (integer or decimal)
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="title is-4">Inputs</h2>
        <form>
          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input
                  name="a"
                  type="checkbox"
                  checked={input?.a}
                  onChange={onInputChange}
                />
                A
                <input
                  name="b"
                  type="checkbox"
                  checked={input?.b}
                  onChange={onInputChange}
                />
                B
                <input
                  name="c"
                  type="checkbox"
                  checked={input?.c}
                  onChange={onInputChange}
                />
                C
              </label>

              <div className="field is-horizontal">
                <label className="label">D</label>
                <div className="control">
                  <input
                    name="d"
                    className="input"
                    type="text"
                    placeholder="Type a float value"
                    value={input?.d || ''}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="field is-horizontal">
                <label className="label">E</label>
                <div className="control">
                  <input
                    name="e"
                    className="input"
                    type="text"
                    placeholder="Type an integer"
                    value={input?.e || ''}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="field is-horizontal">
                <label className="label">F</label>
                <div className="control">
                  <input
                    name="f"
                    className="input"
                    type="text"
                    placeholder="Type an integer"
                    value={input?.f || ''}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="title is-4">H Values</h2>

          <div className="field is-horizontal">
            <label className="label">M</label>
            <div className="control">
              <input
                name="m"
                className="input"
                type="text"
                placeholder="Type an integer"
                value={input?.m || ''}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="field is-horizontal">
            <label className="label">P</label>
            <div className="control">
              <input
                name="p"
                className="input"
                type="text"
                placeholder="Type an integer"
                value={input?.p || ''}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="field is-horizontal">
            <label className="label">T</label>
            <div className="control">
              <input
                name="t"
                className="input"
                type="text"
                placeholder="Type an integer"
                value={input?.t || ''}
                onChange={onInputChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
