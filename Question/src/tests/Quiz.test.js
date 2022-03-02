import '@testing-library/jest-dom';
import React from 'react';
import { render as rtlRender, fireEvent, screen} from '@testing-library/react';
import { Home, Quiz } from '../pages';
import { MemoryRouter,Route, Routes } from 'react-router';


const BASE_NAME = `/${process.env.REACT_APP_HASH}`;


const render = (ui, { route = '/questionnaire/1', ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => <MemoryRouter initialEntries={BASE_NAME + route}><Routes><Route path="/questionnaire/:id" element={<children/>}/></Routes>{children}</MemoryRouter>;
  window.history.pushState({}, 'Test page', BASE_NAME + route);
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
        {
            "id" : 1,
            "questionbank" : [
                {
                    "Question" : "A/An __________ assessment is one which measures what it is intended to measure",
                    "Option1" : "Valid",
                    "Option2" : "Unvalid",
                    "Option3" : "Reliable",
                    "Option4" : "Unreliable",
                    "Answer" : 1
                },
                {
                    "Question" : "The use of technology to enhance learning process is called __________ in education.",
                    "Option1" : "IT",
                    "Option2" : "ICT",
                    "Option3" : "Information Technology",
                    "Option4" : "Communication Technology",
                    "Answer" : 2
                }
            ]    
        }    
  ]),
  })
);

describe('Quiz Page',() => {
  
  test('Quiz is showing questions,options,OK and NExt button',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")

    const test = screen.queryByTestId("title")
    expect(test).toHaveTextContent(1)

    const question = screen.queryByTestId("question")
    expect(question).toBeInTheDocument()
    expect(question).toHaveTextContent("A/An __________ assessment is one which measures what it is intended to measure")

    const option1 = screen.queryByTestId("option-1")
    expect(option1).toBeInTheDocument()

    const option2 = screen.queryByTestId("option-2")
    expect(option2).toBeInTheDocument()

    const option3 = screen.queryByTestId("option-3")
    expect(option3).toBeInTheDocument()

    const option4 = screen.queryByTestId("option-4")
    expect(option4).toBeInTheDocument()

    const ok = screen.queryByTestId("ok")
    expect(ok).toBeInTheDocument()

    const next = screen.queryByTestId("next")
    expect(next).toBeInTheDocument()

  });

  test('Next button is disabled & onClick Ok button next button should enables & ok should be disabled',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")

    const next = screen.queryByTestId("next")
    expect(next).toBeDisabled()
    
    const ok = screen.queryByTestId("ok")
    fireEvent.click(ok)
    
    expect(ok).toBeDisabled()
    expect(next).not.toBeDisabled()
  });

  test('Onclick Next button the question should change',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")
    
    const ok = screen.queryByTestId("ok")
    fireEvent.click(ok)

    const next = screen.queryByTestId("next")
    fireEvent.click(next)

    const question = screen.queryByTestId("question")
    expect(question).toBeInTheDocument()
    expect(question).toHaveTextContent("The use of technology to enhance learning process is called __________ in education.")
  });

  test('Onclick Ok button answer should be validated',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")
    
    const ok = screen.queryByTestId("ok")
    fireEvent.click(ok)

    const validate = screen.queryByTestId("validate-answer")
    expect(validate).toBeInTheDocument()

    expect(validate).toHaveTextContent("Your Answer is wrong, Correct answer is 1")

    expect(validate).toHaveStyle({color : "red"})
  });

  test('Onclick Ok button right answer should be validated',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")
    
    const ok = screen.queryByTestId("ok")
    
    const option1 = screen.queryByTestId("option-1")
    fireEvent.click(option1)

    fireEvent.click(ok)

    const validator = screen.queryByTestId("validate-answer")

    expect(validator).toHaveTextContent("Your Answer is correct")

    expect(validator).toHaveStyle({color : "green"})
  });

  test('Final Value of score',async () => {

    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")
    
    const ok = screen.queryByTestId("ok")
    
    const option1 = screen.queryByTestId("option-1")
    fireEvent.click(option1)

    fireEvent.click(ok)

    const next = screen.queryByTestId("next")
    fireEvent.click(next)

    const question = screen.queryByTestId("question")
    expect(question).toHaveTextContent("The use of technology to enhance learning process is called __________ in education.")

    const newoption1 = screen.queryByTestId("option-1")
    fireEvent.click(newoption1)
    const newok = screen.queryByTestId("ok")
    fireEvent.click(newok)
    const newnext = screen.queryByTestId("next")
    fireEvent.click(newnext)

    const score = screen.queryByTestId("score")
    expect(score).toBeInTheDocument()
    expect(score).toHaveTextContent(1)

    const correct = screen.queryByTestId("correct-question")
    expect(correct).toBeInTheDocument()
    expect(correct).toHaveTextContent(1)

    const incorrect = screen.queryByTestId("incorrect-question")
    expect(incorrect).toBeInTheDocument()
    expect(incorrect).toHaveTextContent(1)
  });

  test('Checking the timer functionality',async () => {

    jest.useFakeTimers();
    
    const { findByText } = rtlRender(
      <MemoryRouter initialEntries={["/questionnaire/1"]}>
        <Routes>
        <Route path="/questionnaire/:id" element={<Quiz/>}/>
        </Routes>
      </MemoryRouter>
    );

    await findByText("1")

    const question = screen.queryByTestId("question")
    expect(question).toHaveTextContent("A/An __________ assessment is one which measures what it is intended to measure")

    jest.advanceTimersByTime(10000)
    
    const question2 = screen.queryByTestId("question")
    expect(question2).toHaveTextContent("The use of technology to enhance learning process is called __________ in education.")

    jest.advanceTimersByTime(20000)

    const score = screen.queryByTestId("score")
    expect(score).toBeInTheDocument()
    expect(score).toHaveTextContent(0)

  });
 
});
