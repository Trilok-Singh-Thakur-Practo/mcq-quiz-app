import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Extract query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const startTime = urlParams.get("startTime");
    const endTime = urlParams.get("endTime");

    // Redirect if required parameters are missing
    useEffect(() => {
        if (!token || !startTime || !endTime) {
            alert("Invalid or missing quiz link!");
            navigate("/login");
        }
    }, [navigate, token, startTime, endTime]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { name, email };

        try {
            const response = await axios.post(`http://localhost:8080/quizzes/user-login?token=${token}`, user, {
                headers: { "Content-Type": "application/json" }
            });

            //console.log(response);
            const userId = response.data;
            navigate(`/quizzes/take-quiz?userId=${userId}&token=${token}&startTime=${startTime}&endTime=${endTime}`);
            //console.log(`userId=${userId}&token=${token}&startTime=${startTime}&endTime=${endTime}`);
        } catch (error) {
            setError(error.response?.data || "Access denied");
        }
    };

    return (
        <div>
            <h2>Enter your details to start the quiz</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label htmlFor="name">Enter Name:</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <br /><br />

            <label htmlFor="email">Enter Email:</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br /><br />

            <button onClick={handleLogin}>Start Quiz</button>
        </div>
    );
};

export default UserLogin;
