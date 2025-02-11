import React from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-3xl font-bold mb-6">Welcome to Quiz App</div>

      <button
        onClick={() => navigate("/quizzes/create-quiz")}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Create Quiz
      </button>
    </div>
  );
};

export default QuizPage;
