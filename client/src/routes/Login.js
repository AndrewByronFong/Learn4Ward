import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '../components/ResponsiveAppbar';
import '../styles/Login.css';
// uncomment axios when backend done
//import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // temporarily login with "admin" and "admin"
        if (username === 'admin' && password === 'admin') {
            console.log('Login successful!');
            navigate('/dashboard');
        } else {
            setError('Login failed: Invalid username or password');
        }
        /* this is for when backend is done
        try {
            const response = await axios.post('http://localhost:6000/login', {
                username,
                password,
            });
            if (response.status === 200) {
                console.log('Login successful!');
                navigate('/dashboard');
            } else {
                setError('Login failed: ' + response.data.message);
            }
        } catch (error) {
            setError('Error during login: ' + error.message);
        }
        */
    };

    return (
        <div>
            <AppBar />
            <div className="login">
                <h1>Login to Learn4Ward</h1>
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

                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
