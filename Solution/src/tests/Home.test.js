import '@testing-library/jest-dom';
import React from 'react';
import { render as rtlRender, fireEvent, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Home, Quiz } from '../pages';
import { MemoryRouter } from 'react-router';


const BASE_NAME = `/${process.env.REACT_APP_HASH}`;


const render = (ui, { route = '/', ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
  window.history.pushState({}, 'Test page', BASE_NAME + route);
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
          id : 1,
          title : "Question Bank - 1",
          questions : 6
      }
  ]),
  })
);


describe('Home Page',() => {
  test('Home Page Renders with Questionnaires with title & no. of questions and attempt',async () => {

    await act(async () => {
     await render(<Home/>)
    })

    const title = screen.queryByTestId('title-Question Bank - 1');
    expect(title).toBeInTheDocument();

    const number = screen.queryByTestId('questionnaire-number');
    expect(number).toBeInTheDocument();

    const attempt = screen.queryByTestId('attempt');
    expect(attempt).toBeInTheDocument();
  });
 
});
