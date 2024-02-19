import { render, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

test('submit the form and display results', () => {
  const {getByPlaceholderText, getByRole} = render(<App />);

  const input = getByPlaceholderText('Enter laptop name');
  fireEvent.change(input, {target: {value: '...'}});

  const button = getByRole('button', {name: 'Submit'});
  fireEvent.click(button);

  expect(results.length).toBeGreaterThan(0);
});

// test('should render without crashing', () => {
//   render(<App/>);
// });