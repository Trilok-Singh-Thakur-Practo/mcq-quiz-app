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
    axios
      .get("http://localhost:8080/quizzes/allQuizzes")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
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
    setInvitedEmails(invitedEmails.filter((e) => e !== email));
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
        `http://localhost:8080/invitations/generate?quizId=${selectedQuizId}`, // Pass quizId as a query param
        invitedEmails, // Send emails as JSON array in the request body
        {
          headers: { "Content-Type": "application/json" },
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Invite Users</h2>

        <form onSubmit={sendInvitation} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Quiz:</label>
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select a Quiz --</option>
              {quizzes.map((quiz) => (
                <option key={quiz.quizId} value={quiz.quizId}>
                  {quiz.quizName} (ID: {quiz.quizId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Enter User Email to Invite:
            </label>
            <div className="flex">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addEmail}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
              >
                Add
              </button>
            </div>
          </div>

          <ul className="space-y-2">
            {invitedEmails.map((email) => (
              <li
                key={email}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border"
              >
                {email}
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Generate Invitation
          </button>
        </form>

        {inviteLink && (
          <div className="mt-6 p-4 bg-blue-50 border rounded-lg">
            <h4 className="text-lg font-medium">Invitation Link:</h4>
            <a
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {inviteLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteUsers;
