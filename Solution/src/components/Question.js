import React from 'react'
import { useState,useEffect } from 'react';

export default function Question(props){

    useEffect(() => {
        var timer = setTimeout(() => {
            props.handleTimeout()
        },10000)

      return () => {
          clearTimeout(timer)
      }
    },[])

    const [option, setOption] = useState(0);

    const handleOk = (answer) => {
        if (option == answer) {
            const ans = document.getElementById('ans');
            ans.innerHTML = 'Your Answer is correct';
            ans.style.color = 'green';
            ans.style.display = 'block';
            props.handleOk(true)
          } else if (option != answer) {
            const ans = document.getElementById('ans');
            ans.innerHTML = `Your Answer is wrong, Correct answer is ${answer}`;
            ans.style.color = 'red';
            ans.style.display = 'block';
            props.handleOk(false)
          }
    }

    return(
        <>
        <h5>Q. <span data-testid = "question">{props.value.Question}</span></h5>
              <div className="row my-3">
                <div className="col-9 ml-3">
                  <input
                    type="radio"
                    value={1}
                    name="option"
                    onClick={(e) => {
                      setOption(e.target.value);
                    }}
                    data-testid = "option-1"
                  />
                  <label>{props.value.Option1}</label>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-9 ml-3">
                  <input
                    type="radio"
                    value={2}
                    name="option"
                    onClick={(e) => {
                      setOption(e.target.value);
                    }}
                    data-testid = "option-2"
                  />
                  <label>{props.value.Option2}</label>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-9 ml-3">
                  <input
                    type="radio"
                    value={3}
                    name="option"
                    onClick={(e) => {
                      setOption(e.target.value);
                    }}
                    data-testid = "option-3"
                  />
                  <label>{props.value.Option3}</label>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-9 ml-3">
                  <input
                    type="radio"
                    value={4}
                    name="option"
                    onClick={(e) => {
                      setOption(e.target.value);
                    }}
                    data-testid = "option-4"
                  />
                  <label>{props.value.Option4}</label>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-9 ml-3">
                  <p style={{ display: 'none' }} id="ans" data-testid ="validate-answer"></p>
                </div>
              </div>

              <div className="row my-2">
                <div className="col-3 mx-auto">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                        handleOk(props.value.Answer);
                    }}
                    disabled={props.ok}
                    data-testid = "ok"
                  >
                    Ok
                  </button>
                </div>
                <div className="col-3 mx-auto">
                  <button
                    className="btn btn-danger"
                    id="next"
                    onClick={() => {
                      props.handleNext()
                    }}
                    disabled={props.disabled}
                    data-testid = "next"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
    )
}