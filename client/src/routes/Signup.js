import React from "react";
import AppBar from '../components/ResponsiveAppbar';
import ScramblingText from "../components/ScramblingTitle";
import '../styles/Signup.css'
import axios from 'axios';

function Signup() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form_data = new FormData(event.target);
        const username = new form_data.get("username");
        const password = new form_data.get("password");

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log('Signup successful!');
            }
            else {
                console.error('Signup failed:', response.statusText);
            }
        }
        catch (error) {
            console.error('Error during signup', error.message);
        }
    };

    return (
        <div>
            <AppBar />
            <div className="form">
                <ScramblingText text="Sign up for Learn4Ward" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <br />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;