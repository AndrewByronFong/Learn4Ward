import React, { useState } from "react";
import axios from 'axios';
import AppBar from '../components/ResponsiveAppbar';
import Button from '@mui/material/Button';
import '../styles/Signup.css';

function Signup() {
    const [error, setError] = useState(null);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        const username = form_data.get("username");
        const password = form_data.get("password");

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters and contain at least 1 uppercase and 1 lowercase letter.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:6000/signup', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log('Signup successful!');
            } else {
                console.error('Signup failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during signup', error.message);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="login">
                <div className="background">
                    <p className="header">Sign up 4 Learn4Ward</p>
                    <form onSubmit={handleSubmit} className="form">
                        <label>
                            Username
                            <input type="text" name="username" />
                        </label>
                        <label>
                            Password
                            <input type="password" name="password" />
                        </label>
                        <Button
                            style={{ color: 'black', fontSize: '1.2rem', fontFamily: 'LexendDeca' }}
                            type="submit"
                        >
                            SIGN UP
                        </Button>

                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
