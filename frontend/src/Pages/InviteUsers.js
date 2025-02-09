import React, { useState, useEffect } from "react";
import axios from "axios";

const InviteUsers = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState("");
    const [email, setEmail] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    // Fetch quizzes when the component loads
    useEffect(() => {
        axios.get("http://localhost:8080/quizzes/allQuizzes")
            .then(response => {
                //console.log(response);
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error("Error fetching quizzes:", error);
            });
    }, []);

    // Handle form submission
    const sendInvitation = async (e) => {
        e.preventDefault();

        if (!selectedQuizId || !email) {
            alert("Please select a quiz and enter an email.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/invitations/generate`, null, {
                params: { quiz_id: selectedQuizId, email }
            });

            setInviteLink(response.data);
            alert("Invitation Link Generated successfully!");
        } catch (error) {
            console.error("Error sending invitation:", error);
            alert("Failed to send invitation.");
        }
    };

    return (
        <div>
            <h2>Invite Users</h2>

            <form onSubmit={sendInvitation}>

                <label>Select Quiz:</label>
                <select value={selectedQuizId} onChange={ (e) => setSelectedQuizId(e.target.value)} required>
                    <option value="">-- Select a Quiz --</option>
                    {quizzes.map((quiz) => (
                        <option key={quiz.quizId} value={quiz.quizId}>
                            {quiz.quizName} (ID: {quiz.quizId})
                        </option>
                    ))}
                </select>
                <br />

                <label>Your Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />

                <br /><br />
                <span>Generate Link for invitation : </span>
                <button type="submit">Generate</button>
            </form>

            {inviteLink && (
                <div>
                    <h4>Invitation Link : </h4>
                    <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
                </div>
            )}
        </div>
    );
};

export default InviteUsers;
