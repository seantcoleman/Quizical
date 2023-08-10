import React from 'react'

const Question = (props) => {
  return (
    <div>
      <p>Question {props.number}</p>
      <p>{props.category}</p>
      <p>{props.questionText}</p>
      <p>{props.correctAnswer}</p>
      <p>{props.incorrectAnswers}</p>
    </div>
  )
}

export default Question