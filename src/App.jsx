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

  // 1. Restart game - done
  // 2. Show green/red colors on checked - done
  // 3. Select specific categories
  // 4. Style & design
  

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("https://opentdb.com/api.php?amount=3")
      const data = await res.json()
      let q = []
      data.results.forEach(question => {
        q.push({id:nanoid(), questionText:question.question, correct:question.correct_answer, selected:null, checked:false, answers:shuffleArray([...question.incorrect_answers, question.correct_answer])})
      })
      setQuestions(q)
    }
    getQuestion()
  }, [count])

  function startGame() {
    setGame(x => !x)
  }

  console.log(questions)

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? {...question, selected: answer} : question
    }))
  }

    function handleCheck() {
      setQuestions(questions => questions.map(question => {
        console.log(questions)
        return {...question, checked: true}
      }))
      setChecked(true)
      let correct = 0
      questions.forEach(question => {
        if (question.selected === question.correct) {
          correct += 1
        }
      })
      setCorrect(correct)
    }

    function handlePlayAgain() {
      setCount(count => count += 1)
      setChecked(false)
    }

    let questionElements = questions.map((question) => 
    <Question
      question={question}
      handleClickAnswer={handleClickAnswer}
      id={question.id}
      key={question.id}
    />)

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
            <button onClick={checked ? handlePlayAgain : handleCheck}>{checked ? 'Restart' : 'Check answers' }</button>
          </div>
          <div>
          {checked && <span className='score'>You scored {correct}/{questionElements.length}</span>}
          </div>
        </>
        }
    </>
  )
}

export default App