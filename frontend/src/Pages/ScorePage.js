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
        axios.get(`http://localhost:8080/results/get-score?userId=${userId}&quizId=${quizId}`)
            .then(response => {
                setScore(response.data);
            })
            .catch(error => {
                setError(error.response?.data || "Error fetching score.");
            });
    }, [userId, quizId]);

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (score === null) return <div>Loading score...</div>;

    return (
        <div>
            <h2>Quiz Completed!</h2>
            <h3>Your Score: {score}</h3>
            
            <button onClick={() => navigate("/quizzes")}>Go to Home</button>
        </div>
    );
};

export default ScorePage;
