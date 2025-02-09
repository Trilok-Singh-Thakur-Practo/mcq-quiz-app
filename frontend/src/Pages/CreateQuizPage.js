import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const [quizName, setQuizName] = useState('');
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [questions, setQuestions] = useState([]);
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    // Handle quiz name, number of questions, and time submission
    const handleQuizSetup = (e) => {
        e.preventDefault();
        setQuestions(Array.from({ length: noOfQuestions }, () => ({
            questionDescription: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctOption: ''
        })));
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
        const quizData = { quizName, noOfQuestions, startTime, endTime, questions };
        try {
            const response = await axios.post('http://localhost:8080/quizzes/createQuiz', quizData);
            alert(response.data);

            navigate('/quizzes/invite-users');
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Failed to create quiz');
        }
    };

    return (
        <div>
            {step === 1 && (
                <form onSubmit={handleQuizSetup}>
                    <label>Quiz Name:</label>
                    <input type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} required />
                    <br />
                    <label>Number of Questions:</label>
                    <input type="number" value={noOfQuestions} onChange={(e) => setNoOfQuestions(e.target.value)} required />
                    <br />
                    <label>Start Time:</label>
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    <br />
                    <label>End Time:</label>
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    <br />
                    <button type="submit">Next</button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit}>
                    {questions.map((q, index) => (
                        <div key={index}>
                            <h3>Question {index + 1}</h3>
                            <label htmlFor="description">Question Description : </label>
                            <input type="text" id='description' placeholder="Enter question" value={q.questionDescription} onChange={(e) => handleQuestionChange(index, 'questionDescription', e.target.value)} required />
                            <br />
                            <br />
                            <label htmlFor="option1">option1 : </label>
                            <input id='option1' type="text" placeholder="Option 1" value={q.option1} onChange={(e) => handleQuestionChange(index, 'option1', e.target.value)} required />
                            <br />
                            <label htmlFor="option2">option2 : </label>
                            <input id='option2' type="text" placeholder="Option 2" value={q.option2} onChange={(e) => handleQuestionChange(index, 'option2', e.target.value)} required />
                            <br />
                            <label htmlFor="option3">option3 : </label>
                            <input id='option3' type="text" placeholder="Option 3" value={q.option3} onChange={(e) => handleQuestionChange(index, 'option3', e.target.value)} required />
                            <br />
                            <label htmlFor="option4">option4 : </label>
                            <input id='option4' type="text" placeholder="Option 4" value={q.option4} onChange={(e) => handleQuestionChange(index, 'option4', e.target.value)} required />
                            <br />
                            <label>Correct Option:</label>
                            <select value={q.correctOption} onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)} required>
                                <option value="">Select</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                            </select>
                        </div>
                    ))}
                    <br />
                    <button type="submit">Create Quiz</button>
                </form>
            )}
        </div>
    );
};

export default CreateQuiz;
