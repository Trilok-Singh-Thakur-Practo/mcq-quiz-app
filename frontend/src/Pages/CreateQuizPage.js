import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // Handle quiz name, number of questions, and time submission
  const handleQuizSetup = (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const selectedStartTime = new Date(startTime);
    const selectedEndTime = new Date(endTime);

    if (selectedStartTime <= currentTime) {
        alert("Start time must be in the future.");
        return;
    }

    if (selectedEndTime <= selectedStartTime) {
        alert("End time must be greater than start time.");
        return;
    }

    setQuestions(
      Array.from({ length: noOfQuestions }, () => ({
        questionDescription: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      }))
    );
    setStep(2);
  };

  // Handle question input change
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quiz = { quizName, noOfQuestions, startTime, endTime, questions };
    try {
      const response = await axios.post(
        "http://localhost:8080/quizzes/createQuiz",
        quiz,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(response.data);

      navigate("/quizzes/invite-users");
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {step === 1 && (
          <form onSubmit={handleQuizSetup} className="space-y-4">
            <label className="block font-medium">Quiz Name:</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block font-medium">Number of Questions:</label>
            <input
              type="number"
              value={noOfQuestions}
              onChange={(e) => setNoOfQuestions(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block font-medium">Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block font-medium">End Time:</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">
                  Question {index + 1}
                </h3>

                <label className="block font-medium">
                  Question Description:
                </label>
                <input
                  type="text"
                  placeholder="Enter question"
                  value={q.questionDescription}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "questionDescription",
                      e.target.value
                    )
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block font-medium">Option 1:</label>
                    <input
                      type="text"
                      placeholder="Option 1"
                      value={q.option1}
                      onChange={(e) =>
                        handleQuestionChange(index, "option1", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Option 2:</label>
                    <input
                      type="text"
                      placeholder="Option 2"
                      value={q.option2}
                      onChange={(e) =>
                        handleQuestionChange(index, "option2", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Option 3:</label>
                    <input
                      type="text"
                      placeholder="Option 3"
                      value={q.option3}
                      onChange={(e) =>
                        handleQuestionChange(index, "option3", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">Option 4:</label>
                    <input
                      type="text"
                      placeholder="Option 4"
                      value={q.option4}
                      onChange={(e) =>
                        handleQuestionChange(index, "option4", e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <label className="block font-medium mt-4">
                  Correct Option:
                </label>
                <select
                  value={q.correctOption}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctOption", e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Create Quiz
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
