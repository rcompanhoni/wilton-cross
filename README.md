# Front End Engineer Assessment - Rafael Companhoni

Live version (using AWS Amplify): https://master.d3056jgplxqe3n.amplifyapp.com

## How to run it

1. Install the dependencies with `npm i`
2. Run the app with `npm start`
3. Optionally, run the tests with `npm t`

## Mockup

Based on the requirements, this mockup was created to accomplish the following:

1. The first card allows the user to change the set of expressions that will be evaluated (can be switched between 'base', 'custom 1', and 'custom 2').
2. The second card receives the user input, with three boolean inputs (A, B, and C) and three numeric ones (D, E, and F).
3. The third displays the final result or an error message if the inputs don't match any expression.

![Mockup](public/mockup.png 'Mockup')

## Initial Project Setup

- Uses the `create-react-app with TypeScript` boilerplate.
- Uses the [Bulma](https://bulma.io) SCSS framework for styling. It helps to ensure the application will be responsive (i.e. it will render well on a variety of devices).

## Component structure

Each component has its own folder which contains

1. The index.tsx with the component JSX implementation.
2. The scss styles (scoped for this component only).
3. The tests, using the RTL (react-testing-library).

A brief description of each component:

- **Index**: main parent component, used to lift the state up so it can be easily shared by the children components.
- **Expressions**: allows the user to select an expression set.
- **Inputs**: allows the user to provide the inputs. Implements validation on the float and integer inputs.
- **Result**: evaluate the expression given the user inputs and selected expression set.

## Interfaces

At the `src/lib` folder are the TypeScript interfaces used to represent the overall state and props.
