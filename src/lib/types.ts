export interface Input {
  a: boolean;
  b: boolean;
  c: boolean;
  d?: number;
  e?: number;
  f?: number;
  m: number;
  p: number;
  t: number;
  hasError: boolean;
}

export interface InputExpression {
  a: boolean;
  b: boolean;
  c: boolean;
  output: number;
}

export interface OutputExpression {
  h: number;
  d: number;
  e: number;
  f: number;
}

export interface Result {
  k: number;
}

export interface State {
  input: Input;
  inputExpressions?: InputExpression[];
  outputExpressions?: OutputExpression[];
  result?: Result;
}
