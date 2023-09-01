import React from 'react'
import {decode} from 'html-entities';


const Question = (props) => {

  function insertRandomItem(array, item) {
    const randomIndex = Math.floor(Math.random() * (array.length + 1))
    array.splice(randomIndex, 0 , item)
    return array;
  }

  const allAnswers = insertRandomItem(props.incorrectAnswers, props.correctAnswer)
  const answerElements = allAnswers.map((item, i) => <button className='answerOption'>{item}</button>)

  return (
    <div className='question'>
      <p>{decode(props.questionText)}</p>
      <div className='optionsContainer'>{decode(answerElements)}</div>
    </div>
  )
}

export default Question