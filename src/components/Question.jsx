import React from 'react'
import {decode} from 'html-entities';
import { nanoid } from 'nanoid'

const Question = (props) => {

  function insertRandomItem(array, item) {
    const randomIndex = Math.floor(Math.random() * (array.length + 1))
    array.splice(randomIndex, 0 , item)
    return array;
  }

  const allAnswers = insertRandomItem(props.incorrectAnswers, props.correctAnswer)
  console.log(allAnswers)
  const answerElements = allAnswers.map((item, i) => <button className='answerOption' key={nanoid()}>{item}</button>)

  return (
    <div className='question'>
      <p>{decode(props.questionText)}</p>
      <div className='optionsContainer'>{answerElements}</div>
    </div>
  )
}

export default Question