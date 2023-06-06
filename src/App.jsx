import { useState } from 'react'
import { useEffect } from 'react'
import Question from './components/Question'
import './App.css'

function App() {
  const [game, setGame] = useState(false)
  const [questions, setQuestions] = useState({})

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
  }, [])

  console.log(questions)

  

  return (
    <>
      <h1>Quizicle</h1>
        {!game && <button onClick={() => setGame((game) => true)}>
          Start game
        </button>}

        <pre>{JSON.stringify(questions, null, 4)}</pre>
    </>
  )
}

export default App

// 
