import React from 'react'
import {decode} from 'html-entities';

const Question = (props) => {

  function insertRandomItem(array, item) {
    const randomIndex = Math.floor(Math.random() * (array.length + 1))
    array.splice(randomIndex, 0 , item)
    return array;
  }
  // const allAnswers = insertRandomItem(props.incorrectAnswers, 3)

  const allAnswers = insertRandomItem(props.incorrectAnswers, props.correctAnswer)
  console.log(allAnswers)
  const answerElements = allAnswers.map((item) => <div className="answerOption">{item}</div>)

  return (
    <div>
      <p>Question {props.number}</p>
      <p> Category: {props.category}</p>
      <p>{decode(props.questionText)}</p>
      {answerElements}
    </div>
  )
}

export default Question