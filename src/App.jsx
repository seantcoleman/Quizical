import { useState } from 'react'
import { useEffect } from 'react'
import Question from './components/Question.jsx'
import './App.css'

function App() {
  const [gameStatus, setGame] = useState(false)
  const [questions, setQuestions] = useState({})

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=3")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
  }, [])

  console.log(questions)

  return (
    <>
      <h1>Quizicle</h1>
        {!gameStatus && <button onClick={() => setGame(() => true)}>
          Start game
        </button>}

        {gameStatus && 
          <>
            <Question
              number="1"
              category={questions[0].category}
              questionText={questions[0].question}
              correctAnswer={questions[0].correct_answer}
              incorrectAnswers={questions[0].incorrect_answers}
            />
            <Question number="2"/>
            <Question number="3"/>
          </>
        }
    </>
  )
}

export default App