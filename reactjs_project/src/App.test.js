import { render, fireEvent} from '@testing-library/react';
import App from './App';
import React from 'react';
// import Homepage from './pages/homepage';
import { getdata } from './model/homepage';


test('submit the form and display results', async () => {
  const {getByPlaceholderText, getByRole} = render(<App />);
  // render(<App/>);
  const input = getByPlaceholderText('Enter laptop name');
  fireEvent.change(input, {target: {value: '...'}});

  const button = getByRole('button', {name: 'Submit'});
  fireEvent.click(button);

  // const results = await getdata();
  // expect(results.length).toBeGreaterThan(0);

});

