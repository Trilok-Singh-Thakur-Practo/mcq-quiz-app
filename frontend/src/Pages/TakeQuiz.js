import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizId, setQuizId] = useState(null);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    axios
      .get(`http://localhost:8080/invitations/validate?token=${token}`)
      .then((response) => {
        setQuiz(response.data);
        setQuizId(response.data.quizId);

        const savedResponses = {};
        response.data.questions.forEach((q) => {
          savedResponses[q.id] = null;
        });
        setAnswers(savedResponses);

        if (response.data.startTime && response.data.endTime) {
          const endTimeMillis = new Date(response.data.endTime).getTime();
          const updateTimer = () => {
            const now = new Date().getTime();
            const remaining = endTimeMillis - now;
            setTimeLeft(remaining > 0 ? remaining : 0);

            if (remaining <= 0) {
              clearInterval(timer);
              submitTest();
            }
          };

          updateTimer();
          const timer = setInterval(updateTimer, 1000);

          return () => clearInterval(timer);
        }
      })
      .catch((error) => {
        setError(error.response?.data || "Error fetching quiz");
      });
  }, [token]);

  const handleOptionChange = (id, option) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));

    axios
      .post("http://localhost:8080/responses/submit-answer", null, {
        params: { userId, questionId: id, userOption: option },
      })
      .catch((error) =>
        console.error("Error saving answer:", error.response?.data)
      );
  };

  const submitTest = () => {
    if (!quizId) {
      alert("Error: Quiz ID is missing");
      return;
    }

    axios
      .post("http://localhost:8080/results/submit-test", null, {
        params: { userId, quizId },
      })
      .then((response) => {
        navigate(`/quizzes/score?userId=${userId}&quizId=${quizId}`);
      })
      .catch((error) => {
        console.error("Error submitting test:", error);
        alert(error.response?.data || "Failed to submit test.");
      });
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {quiz.quizName}
        </h2>

        {timeLeft !== null && (
          <h3 className="text-lg text-red-600 font-semibold text-center mb-4">
            Time Remaining: {Math.floor(timeLeft / 60000)}m{" "}
            {Math.floor((timeLeft % 60000) / 1000)}s
          </h3>
        )}

        <div className="space-y-6">
          {quiz.questions.map((q) => (
            <div key={q.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-medium text-lg mb-2">
                {q.questionDescription}
              </p>
              <div className="space-y-2">
                {["option1", "option2", "option3", "option4"].map((opt) => (
                  <label
                    key={`${q.id}-${opt}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={q[opt]}
                      checked={answers[q.id] === q[opt]}
                      onChange={() => handleOptionChange(q.id, q[opt])}
                      className="w-4 h-4 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{q[opt]}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submitTest}
          className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;
