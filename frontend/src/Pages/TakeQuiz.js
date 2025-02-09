import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeQuiz = () => {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [quizId, setQuizId] = useState(null); //Store quizId in state
    const [error, setError] = useState("");
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
                //console.log("Quiz Data:", response.data);
                setQuiz(response.data);
                setQuizId(response.data.quizId);  //Store quizId from response

                const savedResponses = {};
                response.data.questions.forEach(q => {
                    savedResponses[q.id] = null;
                });
                setAnswers(savedResponses);
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
            //console.log("Quiz submitted successfully. Response:", response.data);
            navigate(`/quizzes/score?userId=${userId}&quizId=${quizId}`); // ✅ Redirect to ScorePage
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
