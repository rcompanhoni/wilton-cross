import React from 'react';
import './App.scss';
import { Inputs, Expressions, Result } from './components';

function App() {
  return (
    <div className="container">
      <h1 className="title">Title</h1>
      <h2 className="subtitle">Subtitle</h2>

      <div className="columns has-same-height">
        <div className="column">
          <Inputs />
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
