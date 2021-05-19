import React, { useState } from 'react';
import validator from 'validator';
import { Input } from '../../lib/types';

interface Props {
  input: Input;
  setInput: (input: Input) => void;
}

interface Errors {
  d?: string;
  e?: string;
  f?: string;
  m?: string;
  p?: string;
  t?: string;
}

export const Inputs = ({ input, setInput }: Props) => {
  const [errors, setErrors] = useState<Errors>({});

  const onInputChange = (evt: React.FormEvent<EventTarget>) => {
    const target = evt.target as HTMLInputElement;
    const field = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setInput({
      ...input,
      [field]: value,
      hasError: validate(field, target.value),
    });
  };

  const validate = (field: string, value: string) => {
    let validation = '';
    if (field === 'd') {
      validation = !validator.isFloat(value) ? 'Must be a float' : '';
    }

    if (['e', 'f'].includes(field)) {
      validation = !validator.isFloat(value) ? 'Must be an integer' : '';
    }

    if (['m', 'p', 't'].includes(field)) {
      validation = !validator.isFloat(value) ? 'Must be a number' : '';
    }

    setErrors({
      ...errors,
      [field]: validation,
    });

    return !!validation;
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
                  <p className="help is-danger">{errors.d}</p>
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
                  <p className="help is-danger">{errors.e}</p>
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
                  <p className="help is-danger">{errors.f}</p>
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
              <p className="help is-danger">{errors.m}</p>
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
              <p className="help is-danger">{errors.p}</p>
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
              <p className="help is-danger">{errors.t}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
