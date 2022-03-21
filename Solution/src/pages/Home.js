import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      // const result = fetch('http://localhost:3000/questionnaires');
  
      // const data = result.json();
  
      // setQuestions(data);

      const abortController = new AbortController();

      fetch('http://localhost:3000/questionnaires',{signal : abortController.signal}).then((res) => {
            return res.json()
      }).then((data) => {
        setQuestions(data)
      }).catch((err) => {
        console.log(err)
      })


      return () => {
        abortController.abort();
      }
    
  }, []);

  return (
    <div className="page">
      <h1 style={{ textAlign: 'center' }}>
        Questionnaires
      </h1>
      {
      questions.map((value,index) => {
        return (
          <div
            className="card mx-auto my-5"
            style={{ width: '25rem', backgroundColor: 'black' }}
          >
            <div className="card-body text-light" style={{ textAlign: 'center' }}>
              <h3 className="card-title my-3" data-testid={`title-${value.title}`}>
                {value.title}
              </h3>
              <h5 className="card-text my-3">
                No. of Questions :-{' '}
                <span data-testid="questionnaire-number">
                  {value.questions}
                </span>
              </h5>
              <Link
                className="btn btn-primary my-3"
                to={`/questionnaire/${value.id}`}
                data-testid="attempt"
              >
                Attempt Quiz
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
