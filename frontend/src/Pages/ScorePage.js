import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ScorePage = () => {
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const quizId = queryParams.get("quizId");

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/results/get-score?userId=${userId}&quizId=${quizId}`
      )
      .then((response) => {
        setScore(response.data);
      })
      .catch((error) => {
        setError(error.response?.data || "Error fetching score.");
      });
  }, [userId, quizId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (score === null) return <div>Loading score...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Quiz Completed!
        </h2>
        <h3 className="text-xl font-semibold text-gray-800">
          Your Score: <span className="text-blue-600">{score}</span>
        </h3>

        <button
          onClick={() => navigate("/quizzes")}
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
