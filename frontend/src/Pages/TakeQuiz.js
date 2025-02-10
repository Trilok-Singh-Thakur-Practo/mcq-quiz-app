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

        axios.get(`http://localhost:8080/invitations/validate?token=${token}`)
            .then(response => {
                setQuiz(response.data);
                setQuizId(response.data.quizId);
                
                const savedResponses = {};
                response.data.questions.forEach(q => {
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
            .catch(error => {
                setError(error.response?.data || "Error fetching quiz");
            });
    }, [token]);

    const handleOptionChange = (id, option) => {
        setAnswers(prev => ({ ...prev, [id]: option }));

        axios.post("http://localhost:8080/responses/submit-answer", null, {
            params: { userId, questionId: id, userOption: option }
        }).catch(error => console.error("Error saving answer:", error.response?.data));
    };

    const submitTest = () => {
        if (!quizId) {
            alert("Error: Quiz ID is missing");
            return;
        }

        axios.post("http://localhost:8080/results/submit-test", null, {
            params: { userId, quizId }
        })
        .then(response => {
            navigate(`/quizzes/score?userId=${userId}&quizId=${quizId}`);
        })
        .catch(error => {
            console.error("Error submitting test:", error);
            alert(error.response?.data || "Failed to submit test.");
        });
    };

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!quiz) return <div>Loading quiz...</div>;

    return (
        <div>
            <h2>{quiz.quizName}</h2>
            {timeLeft !== null && (
                <h3>Time Remaining: {Math.floor(timeLeft / 60000)}m {Math.floor((timeLeft % 60000) / 1000)}s</h3>
            )}

            {quiz.questions.map((q) => (
                <div key={q.id}>
                    <p><strong>{q.questionDescription}</strong></p>
                    {["option1", "option2", "option3", "option4"].map((opt) => (
                        <label key={`${q.id}-${opt}`}>
                            <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={q[opt]}
                                checked={answers[q.id] === q[opt]}
                                onChange={() => handleOptionChange(q.id, q[opt])}
                            />
                            {q[opt]}
                        </label>
                    ))}
                </div>
            ))}

            <button onClick={submitTest}>Submit Quiz</button>
        </div>
    );
};

export default TakeQuiz;
