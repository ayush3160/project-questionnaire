import React from 'react';
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Question from '../components/Question';

export default function Quiz() {
  const {id}  = useParams();

  const [test, setTest] = useState([]);

  const [loaded,setLoaded] = useState(false)

  const [question, setQuestion] = useState(0);

  const [disabled, setDisabled] = useState(true);

  const [correct, setCorrect] = useState(0);

  const [incorrect, setIncorrect] = useState(0);

  const [ok, setOk] = useState(false);

  useEffect(() => {

    const abortController = new AbortController();

    fetch('http://localhost:3000/questions',{signal : abortController.signal})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const [result, notused] = data.map((value) => {
          if (value.id == id) {
            return value.questionbank;
          }
        });
        setTest(result);
        setLoaded(true);
      }).catch((err) => {
        console.log(err)
      })
    
    return () => {
      abortController.abort();
    }  
  }, []);

  const handleOk = (answer) => {
    if(answer){
      setCorrect(correct+1)
    }else if(!answer){
      setIncorrect(incorrect+1)
    }
    setDisabled(false);
    setOk(true);
  };

  const handleNext = () => {
    setQuestion(question + 1);
    setOk(false);
    setDisabled(true);
  };

  const handleTimeout = () => {
    setIncorrect(incorrect+1)
    setQuestion(question+1)
  }

  if (question == test.length && loaded) {
    return (
      <>
        <h1>Thanks For attempting the test</h1>
        <br />
        <h1>
          Your Score is :- {'  '}
          <span data-testid="score">{correct}</span>
        </h1>
        <br />
        <h3>
          Total Correct :- {'  '}
          <span data-testid = "correct-question">{correct}</span>
        </h3>
        <br />
        <h3>
          Total InCorrect :- {'  '}
          <span data-testid = "incorrect-question">{incorrect}</span>
        </h3>
      </>
    );
  }

  return (
    <div className="page">
      <h1 data-testid="title">{id}</h1>
      {test.map((value, index) => {
        if(index == question) {
          return (
            <Question value = {value} handleOk = {handleOk} handleNext = {handleNext} handleTimeout = {handleTimeout} ok={ok} disabled ={disabled}/>  
          );
        }
      })}
    </div>
  );
}
