import React from "react"
import { useState } from 'react'
import './App.css'
import Welcome from "./components/Welcome"
import Quiz from "./components/Quiz"

function App() {
  const [showQuiz, setShowQuiz] = useState(false)
  

  function handleStart() {
    setShowQuiz(true)
  }

  return (
    <div className="App">
      { showQuiz ? 
        (
          <>
          <Quiz />
          </>
        ) : 
        (
          <Welcome 
            onStart={() => {handleStart()}}
          />
        )
      }
      
    </div>
  )
}

export default App
