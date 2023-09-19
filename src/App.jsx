import { useState } from 'react'
import { useEffect } from 'react'
import { nanoid } from 'nanoid'
import Question from './components/Question.jsx'

function App() {
  const [gameStatus, setGame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [count, setCount] = useState(0)

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=1")
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

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? {...question, selected: answer} : question
    }))
    console.log(questions)
  }

  console.log(questions)

  let questionElements = questions.map((question) => 
    <Question
      question={question}
      handleClickAnswer={handleClickAnswer}
      id={question.id}
      key={question.id}
    />)

    function handleCheck() {
      setChecked(true)
      let correct = 0
      questions.forEach(question => {
        if (question.selected === question.correct) {
          correct += 1
        }
      })
      setCorrect(correct)
    }

  return (
    <>
      <h1>Quizicle</h1>
        {!gameStatus ? 
        <button onClick={startGame}>
          Start game
        </button>
        :
        <>
          <div>
            {questionElements}
            <button onClick={handleCheck}>Check answers</button>
          </div>
          <div>
          {checked && <span className='score'>You scored {correct}/5</span>}
          </div>
        </>
        }
    </>
  )
}

export default App