import React, { useState } from 'react';
import AppBar from '../components/ResponsiveAppbar';
import PhonemBoard from '../components/PhonemBoard';
import '../styles/Dashboard.css';

function PhonemDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="Home">
        <AppBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <PhonemBoard />
      </div>
    </>
  );
}

export default PhonemDashboard;