import { render, fireEvent, findByTestId } from '@testing-library/react';
import App from './App';
import React from 'react';
import Homepage from './pages/homepage';


test('submit the form and display results', async () => {
  const {getByPlaceholderText, getByRole} = render(<App />);

  const input = getByPlaceholderText('Enter laptop name');
  fireEvent.change(input, {target: {value: '...'}});

  const button = getByRole('button', {name: 'Submit'});
  fireEvent.click(button);

  const resultElement = await findByTestId('results');
  expect(resultElement).toBeGreaterThan(0);
});

