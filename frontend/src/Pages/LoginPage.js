import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: ''});

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            const response = await axios.post('http://localhost:8080/login', user);
            alert(response.data);  

            navigate('/quizzes');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login Failed!');
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h2>Admin Login</h2>

                <label htmlFor="name">Username:</label>
                <input type="text" id="name" name="name" placeholder="Enter Your Name" value={user.name} onChange={handleChange} />
                <br />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter Your Email" value={user.email} onChange={handleChange} />
                <br />

                <button type="submit">Enter as Admin</button>
            </form>
        </div>
    );
};

export default LoginPage;
