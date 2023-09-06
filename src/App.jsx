import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './components/Question.jsx'

function App() {
  const [gameStatus, setGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=3")
      const data = await res.json()
      let q = []
      data.results.forEach(question => {
        q.push({id:nanoid(), questionText:question.question, correct:question.correct_answer, selected:null, checked:false, answers:shuffleArray([...question.incorrect_answers, question.correct_answer])})
      })
      console.log(data.results)
      setQuestions(q)
    }
    getQuestion()
  }, [count])

  function startGame() {
    setGame(x => !x)
  }

  console.log(questions)

  let questionElements = questions.map((question) => 
    <Question
      question={question}
      id={question.id}
      key={question.id}
    />)

    function checkAnswers() {
      console.log('hello')
    }

  return (
    <>
      <h1>Quizicle</h1>
        {!gameStatus ? 
        <button onClick={startGame}>
          Start game
        </button>
        :
        <div>
          {questionElements}
          <button onClick={checkAnswers}>Check answers</button>
        </div>
        }
    </>
  )
}

export default App