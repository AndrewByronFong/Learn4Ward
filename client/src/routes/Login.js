import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '../components/ResponsiveAppbar';
import Button from '@mui/material/Button';
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
            navigate('/phonemdashboard');
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
                <div className="background">
                    <p className="header">Login to Learn4Ward</p>
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
                        <Button
                            style={{ color: 'black', fontSize: '1.2rem', fontFamily: 'LexendDeca'}}
                            type="submit"
                        >
                            LOGIN
                        </Button>

                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
