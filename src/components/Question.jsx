import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

const Question = (props) => {
  const { question, questionNumber } = props;
  const answers = question.answers;

  const answerElements = answers.map((answer) => {
    let className = "answer-option";

    if (question.checked) {
      if (question.correct === answer) {
        className += " correct";
      } else if (question.selected === answer) {
        className += " incorrect";
      } else {
        className += " not-selected";
      }
    } else if (answer === question.selected) {
      className += " selected";
    }

    return (
      <button
        key={nanoid()}
        onClick={() => handleClick(answer)}
        className={className}
        disabled={question.checked}
      >
        {decode(answer)}
      </button>
    );
  });

  function handleClick(answer) {
    if (!question.checked) {
      props.handleClickAnswer(props.id, answer);
    }
  }

  return (
    <div className="question">
      <div className="question-number">Question {questionNumber}</div>
      <div className="question-text">{decode(question.questionText)}</div>
      <div className="options-container">{answerElements}</div>
    </div>
  );
};

export default Question;
