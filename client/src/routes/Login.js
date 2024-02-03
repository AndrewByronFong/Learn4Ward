import React, { useState } from "react";
import AppBar from '../components/ResponsiveAppbar';
import ScramblingText from "../components/ScramblingTitle";
import '../styles/Login.css'
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            });
            if (response.status === 200) {
                console.log('Login successful!');
            }
            else {
                console.error('Login failed:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error during login', error.message);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="login">
                <ScramblingText text="Login to Learn4Ward" />
                <form onSubmit={handleSubmit} className="form">
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
