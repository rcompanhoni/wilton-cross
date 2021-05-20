import React from 'react';
import './App.css';
import { Inputs, Expressions, Result } from './components';

function App() {
  return (
    <div>
      <h1>ASSESSMENT</h1>
      <p>Instructions</p>
      <Inputs />
      <Expressions />
      <Result />
    </div>
  );
}

export default App;
