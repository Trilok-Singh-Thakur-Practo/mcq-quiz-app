import React, { useState, useEffect } from "react";
import axios from "axios";

const InviteUsers = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState("");
    const [invitedEmails, setInvitedEmails] = useState([]);
    const [emailInput, setEmailInput] = useState("");
    const [inviteLink, setInviteLink] = useState("");

    // Fetch quizzes when the component loads
    useEffect(() => {
        axios.get("http://localhost:8080/quizzes/allQuizzes")
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error("Error fetching quizzes:", error);
            });
    }, []);

    // Add email to the selected list
    const addEmail = () => {
        if (emailInput.trim() && !invitedEmails.includes(emailInput)) {
            setInvitedEmails([...invitedEmails, emailInput.trim()]);
            setEmailInput("");
        }
    };

    // Remove an email from the list
    const removeEmail = (email) => {
        setInvitedEmails(invitedEmails.filter(e => e !== email));
    };

    // Send invitation request
    const sendInvitation = async (e) => {
        e.preventDefault();
    
        if (!selectedQuizId || invitedEmails.length === 0) {
            alert("Please select a quiz and add at least one email.");
            return;
        }
    
        try {
            const response = await axios.post(
                `http://localhost:8080/invitations/generate?quizId=${selectedQuizId}`,  // Pass quizId as a query param
                invitedEmails,  // Send emails as JSON array in the request body
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
    
            setInviteLink(response.data);
            alert("Invitation Link Generated successfully!");
        } catch (error) {
            console.error("Error sending invitations:", error);
            alert(error.response?.data || "Failed to send invitations.");
        }
    };
    

    return (
        <div>
            <h2>Invite Users</h2>

            <form onSubmit={sendInvitation}>
                <label>Select Quiz : </label>
                <select value={selectedQuizId} onChange={e => setSelectedQuizId(e.target.value)} required>
                    <option value="">-- Select a Quiz --</option>
                    {quizzes.map(quiz => (
                        <option key={quiz.quizId} value={quiz.quizId}>
                            {quiz.quizName} (ID: {quiz.quizId})
                        </option>
                    ))}
                </select>
                <br />

                <label>Enter User Email : </label>
                <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <button type="button" onClick={addEmail}>Add</button>
                <br />

                <ul>
                    {invitedEmails.map(email => (
                        <li key={email}>
                            {email} <button type="button" onClick={() => removeEmail(email)}>Remove</button>
                        </li>
                    ))}
                </ul>

                <button type="submit">Generate Invitation</button>
            </form>

            {inviteLink && (
                <div>
                    <h4>Invitation Link:</h4>
                    <a href={inviteLink} target="_blank" rel="noopener noreferrer">{inviteLink}</a>
                </div>
            )}
        </div>
    );
};

export default InviteUsers;