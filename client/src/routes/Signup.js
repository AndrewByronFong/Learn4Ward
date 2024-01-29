import React from "react";
import AppBar from '../components/ResponsiveAppbar';
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
            <h2>Signup</h2>
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
    );
}

export default Signup;