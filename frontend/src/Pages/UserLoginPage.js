import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    
    // Extract query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const startTime = urlParams.get("startTime");
    const endTime = urlParams.get("endTime");

    useEffect(() => {
        if (!token || !startTime || !endTime) {
            alert("Invalid or missing quiz link!");
            navigate("/login");  // Redirect to home if the link is incorrect
        }
    }, [navigate, token, startTime, endTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send registration request
            const user = { name, email};
            const response = await axios.post("http://localhost:8080/quizzes/user-login", user, {
                headers: { "Content-Type": "application/json" } // Ensure JSON format
            });

            //console.log(response);

            const userId  = response.data;
            //console.log(userId);
            //console.log("Type of userId:", typeof userId);

            // Save user details in localStorage
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            

            // Redirect to take-quiz with userId, token, startTime, and endTime in the URL
            navigate(`/quizzes/take-quiz?userId=${userId}&token=${token}&startTime=${startTime}&endTime=${endTime}`);
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Failed to register. Try again.");
        }
    };

    return (
        <div>
            <h2>Enter Your Details to Start the Quiz</h2>
            <form onSubmit={handleSubmit}>
                <label>Name : </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <br /> <br />

                <label>Email : </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br /> <br />

                <button type="submit">Register & Start Quiz</button>
            </form>
        </div>
    );
};

export default LandingPage;
