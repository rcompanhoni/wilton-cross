export interface Input {
  a: boolean;
  b: boolean;
  c: boolean;
  d?: number;
  e?: number;
  f?: number;
  hasError: boolean;
}

export interface ExpressionSet {
  name: string;
  inputExpressionSet: string[];
  outputExpressionSet: string[];
}

export interface Result {
  k: number;
}

export interface State {
  input: Input;
  expressionSet: ExpressionSet;
  result?: Result;
}
