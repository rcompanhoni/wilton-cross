import React, { useState } from 'react';
import './index.scss';
import { Expressions } from './Expressions';
import { Inputs } from './Inputs';
import { Result } from './Result';
import { Input, State } from '../lib/types';

const initialState: State = {
  input: {
    a: false,
    b: false,
    c: false,
    d: undefined,
    e: undefined,
    f: undefined,
    m: 10,
    p: 20,
    t: 30,
  },
};

function App() {
  const [state, setState] = useState<State>(initialState);

  const setInput = (input: Input) => {
    setState({
      ...state,
      input,
    });
  };

  return (
    <div className="container">
      <h1 className="title">Title</h1>
      <h2 className="subtitle">Subtitle</h2>

      <div className="columns has-same-height">
        <div className="column">
          <Inputs input={state.input} setInput={setInput} />
        </div>
        <div className="column">
          <Expressions />
        </div>
        <div className="column">
          <Result />
        </div>
      </div>
    </div>
  );
}

export default App;
