import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Question from "./components/Question.jsx";

function App() {
  const [gameStatus, setGameStatus] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [loading, setLoading] = useState(false);

  // Quiz settings
  const [settings, setSettings] = useState({
    amount: 5,
    category: "",
    difficulty: "",
    type: "",
  });

  // Quiz categories from Open Trivia DB
  const categories = [
    { id: "", name: "Any Category" },
    { id: "9", name: "General Knowledge" },
    { id: "10", name: "Entertainment: Books" },
    { id: "11", name: "Entertainment: Film" },
    { id: "12", name: "Entertainment: Music" },
    { id: "13", name: "Entertainment: Musicals & Theatres" },
    { id: "14", name: "Entertainment: Television" },
    { id: "15", name: "Entertainment: Video Games" },
    { id: "16", name: "Entertainment: Board Games" },
    { id: "17", name: "Science & Nature" },
    { id: "18", name: "Science: Computers" },
    { id: "19", name: "Science: Mathematics" },
    { id: "20", name: "Mythology" },
    { id: "21", name: "Sports" },
    { id: "22", name: "Geography" },
    { id: "23", name: "History" },
    { id: "24", name: "Politics" },
    { id: "25", name: "Art" },
    { id: "26", name: "Celebrities" },
    { id: "27", name: "Animals" },
    { id: "28", name: "Vehicles" },
  ];

  const difficulties = [
    { value: "", label: "Any Difficulty" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const questionTypes = [
    { value: "", label: "Any Type" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "boolean", label: "True / False" },
  ];

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const buildApiUrl = () => {
    let url = `https://opentdb.com/api.php?amount=${settings.amount}`;
    if (settings.category) url += `&category=${settings.category}`;
    if (settings.difficulty) url += `&difficulty=${settings.difficulty}`;
    if (settings.type) url += `&type=${settings.type}`;
    return url;
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(buildApiUrl());
      const data = await res.json();

      if (data.response_code === 0) {
        const formattedQuestions = data.results.map((question) => ({
          id: nanoid(),
          questionText: question.question,
          correct: question.correct_answer,
          selected: null,
          checked: false,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));
        setQuestions(formattedQuestions);
      } else {
        // Handle API errors
        alert("Failed to fetch questions. Please try different settings.");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    setGameStatus(true);
    setChecked(false);
    setCorrect(0);
    fetchQuestions();
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleClickAnswer = (id, answer) => {
    setQuestions((questions) =>
      questions.map((question) =>
        question.id === id ? { ...question, selected: answer } : question
      )
    );
  };

  const handleCheck = () => {
    setQuestions((questions) =>
      questions.map((question) => ({ ...question, checked: true }))
    );
    setChecked(true);

    const correctCount = questions.reduce(
      (count, question) =>
        question.selected === question.correct ? count + 1 : count,
      0
    );
    setCorrect(correctCount);
  };

  const handlePlayAgain = () => {
    setChecked(false);
    setCorrect(0);
    fetchQuestions();
  };

  const handleBackToMenu = () => {
    setGameStatus(false);
    setChecked(false);
    setCorrect(0);
    setQuestions([]);
  };

  const questionElements = questions.map((question, index) => (
    <Question
      key={question.id}
      question={question}
      questionNumber={index + 1}
      handleClickAnswer={handleClickAnswer}
      id={question.id}
    />
  ));

  const getScoreMessage = () => {
    const percentage = (correct / questions.length) * 100;
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 📚";
    return "Keep practicing! 💪";
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Quizical</h1>
        <p className="app-subtitle">
          Test your knowledge with customizable quizzes
        </p>
      </header>

      {!gameStatus ? (
        <div className="card">
          <div className="settings-panel">
            <h2
              style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}
            >
              Quiz Settings
            </h2>

            <div className="settings-grid">
              <div className="setting-group">
                <label className="setting-label">Number of Questions</label>
                <select
                  className="setting-select"
                  value={settings.amount}
                  onChange={(e) =>
                    handleSettingChange("amount", e.target.value)
                  }
                >
                  {[5, 10, 15, 20, 25, 30].map((num) => (
                    <option key={num} value={num}>
                      {num} Questions
                    </option>
                  ))}
                </select>
              </div>

              <div className="setting-group">
                <label className="setting-label">Category</label>
                <select
                  className="setting-select"
                  value={settings.category}
                  onChange={(e) =>
                    handleSettingChange("category", e.target.value)
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="setting-group">
                <label className="setting-label">Difficulty</label>
                <select
                  className="setting-select"
                  value={settings.difficulty}
                  onChange={(e) =>
                    handleSettingChange("difficulty", e.target.value)
                  }
                >
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="setting-group">
                <label className="setting-label">Question Type</label>
                <select
                  className="setting-select"
                  value={settings.type}
                  onChange={(e) => handleSettingChange("type", e.target.value)}
                >
                  {questionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="btn btn-primary btn-large" onClick={startGame}>
              🚀 Start Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <>
              <div className="question-container">{questionElements}</div>

              {checked && (
                <div className="score-container">
                  <div className="score-text">{getScoreMessage()}</div>
                  <div className="score-value">
                    {correct}/{questions.length}
                  </div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {!checked ? (
                  <button className="btn btn-primary" onClick={handleCheck}>
                    ✅ Check Answers
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={handlePlayAgain}
                    >
                      🔄 Play Again
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleBackToMenu}
                    >
                      🏠 Back to Menu
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
