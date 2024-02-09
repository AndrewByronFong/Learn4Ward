import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Profile from './routes/Profile';
import PhonemDashboard from './routes/PhonemDashboard';
import GraphemeDashboard from './routes/GraphemeDashboard';
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
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/phonemdashboard' element={<PhonemDashboard />} />
          <Route path='/grapheme/:phonemName' element={<GraphemeDashboard />} />
          <Route path='/module/:graphemeName' element={<GraphemeModule />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
