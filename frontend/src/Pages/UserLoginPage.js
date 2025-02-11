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
      const response = await axios.post(
        `http://localhost:8080/quizzes/user-login?token=${token}`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      //console.log(response);
      const userId = response.data;
      navigate(
        `/quizzes/take-quiz?userId=${userId}&token=${token}&startTime=${startTime}&endTime=${endTime}`
      );
      //console.log(`userId=${userId}&token=${token}&startTime=${startTime}&endTime=${endTime}`);
    } catch (error) {
      setError(error.response?.data || "Access denied");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter your details to start the quiz
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Enter Name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Enter Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
