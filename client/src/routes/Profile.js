import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`https://api.example.com/users/${username}`); // update later
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, [username]);

    return (
        <div>
            <h2>User Profile</h2>
            {userData ? (
                <>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
