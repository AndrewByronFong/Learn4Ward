import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import GraphemeModule from './components/GraphemeModule';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/profile/:username' element={<Profile />} />
                    <Route path='/module/:soundName' element={<GraphemeModule />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
