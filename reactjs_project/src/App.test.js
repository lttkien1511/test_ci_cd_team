import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import Homepage from './pages/homepage';


test('submit the form and display results', async () => {
  // const {getByPlaceholderText, getByRole} = render(<App />);
  render(<App/>);
  const input = screen.getByPlaceholderText('Enter laptop name');
  fireEvent.change(input, {target: {value: '...'}});

  const button = screen.getByRole('button', {name: 'Submit'});
  fireEvent.click(button);

  const resultElement = await screen.findByTestId('results');
  expect(resultElement).toBeInTheDocument();
});

