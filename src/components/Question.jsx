import React from 'react'
import {decode} from 'html-entities';
import {nanoid} from 'nanoid'

const Question = (props) => {

  let answers = props.question.answers

  const answerElements = answers.map((answer) => {
    let id = null
    if (props.question.checked) {
      if (props.question.correct == answer) {
        id = 'correct'
      } else if (props.q.selected === answer){
        id = 'incorrect'
      } else {
        id = 'not-selected'
      }
    }
    return (
      <button key={nanoid()} id={id} onClick={() => handleClick(answer)} className={answer === props.question.selected ? 'answerOption selected' : 'answerOption'}>{answer}</button>
    )
  })

  function handleClick(answer) {
    props.handleClickAnswer(props.id, answer)

  }

  return (
    <div className='question'>
      <p>{decode(props.question.questionText)}</p>
      <div className='optionsContainer'>{decode(answerElements)}</div>
    </div>
  )
}

export default Question