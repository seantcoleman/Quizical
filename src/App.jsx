import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './components/Question.jsx'

function App() {
  const [gameStatus, setGame] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=3")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
  }, [])

  console.log(questions)

  let questionElements = questions.map((item, index) => 
    <Question 
      category={item.category}
      questionText={item.question}
      correctAnswer={item.correct_answer}
      incorrectAnswers={item.incorrect_answers}
      key={index}
    />)

    function checkAnswers() {
      console.log('hello')
    }

  return (
    <>
      <h1>Quizicle</h1>
        {!gameStatus && <button onClick={() => setGame(() => true)}>
          Start game
        </button>}

        {gameStatus && 
          <>
            {questionElements}
          <button onClick={checkAnswers}>Check answers</button>
          </>
        }
    </>
  )
}

export default App