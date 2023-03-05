import React, { useState, useEffect } from 'react'
import './quiz.css'

const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null))
  const [showAnswers, setShowAnswers] = useState(false)
  const [isReset, setIsReset] = useState(false)
  let [score, setScore] = useState(0)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
      })
      .catch(e => console.error(e));
  }, [isReset])

  const handleSelectAnswer = (questionIndex, answer) => {
    setSelectedAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answer;
      return newAnswers;
    })

    if (questions[questionIndex].correct_answer === answer) {
      setScore(prevScore => prevScore + 1)
    }
  }

  const handleReset = () => {
    setIsReset(!isReset)
    setScore( prevScore => 0)
    setShowAnswers(false)
    setSelectedAnswers(Array(5).fill(null))
  }

  const handleCheckAnswers = () => {
    setShowAnswers(true);
    let newScore = 0
    questions.forEach((q, index) => {
      if(selectedAnswers[index] === q.correct_answer) {
        newScore++
      }
    })
    setScore(newScore)
  }

  const renderAnswers = (questionIndex, answers) => {
    const correctAnswer = questions[questionIndex].correct_answer

    return answers.map(answer => {
      const isCorrectAnswer = answer === correctAnswer;
      const isSelectedAnswer = answer === selectedAnswers[questionIndex]

      let className = "answer";

      if (showAnswers) {
        if (isCorrectAnswer) {
          className += " correct-answer"
        } else if (isSelectedAnswer && !isCorrectAnswer)
        {
          className += " selected-answer opacity"
        } else {
          className += " opacity"
        }
      } else if (isSelectedAnswer) {
        className += " active"
      }

      return (
        <p
          key={answer}
          className={className}
          onClick={() => handleSelectAnswer(questionIndex, answer)}
        >
          {answer}
        </p>
      )
    })
  }

  const renderQuestions = () => {
    return questions.map((question, index) => {
      const answers = [...question.incorrect_answers, question.correct_answer].sort();

      return (
        <div className="quiz" key={index}>
          <h2 className="quiz--title">{question.question}</h2>
          <div className="quiz--answers">{renderAnswers(index, answers)}</div>
        </div>
      )
    })
  }

  return (
    <>
      <section className="quiz-sec">
        {renderQuestions()}
        <img src="./images/blobs.png" className="quiz--blob_1" alt="Blob 1" />
        <img src="./images/blob2.png" className="quiz--blob_2" alt="Blob 2" />
      </section>
      {!showAnswers && <button className="check-answers" onClick={handleCheckAnswers}>Check Answers</button>}
      { showAnswers && 
        <div className="reset-container">
          <h3>You Scored {score}/5 correct answers</h3>
          <button 
            className="reset-quiz_cta"
            onClick={handleReset}
          >Play again</button>
        </div>
      }
    </>
  )
}

export default Quiz
