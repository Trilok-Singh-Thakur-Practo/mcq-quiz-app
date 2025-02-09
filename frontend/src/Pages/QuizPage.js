import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuizPage = () => {

    const navigate = useNavigate();


  return (
    <div>
        <div>Welcome to Quiz App</div>
        <button onClick={ () => navigate("/quizzes/create-quiz") } >Create Quiz</button>
    </div>
  )
}

export default QuizPage;