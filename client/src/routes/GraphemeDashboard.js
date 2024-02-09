import React, { useState } from 'react';
import AppBar from '../components/ResponsiveAppbar';
import GraphemeBoard from '../components/GraphemeBoard';
import '../styles/Dashboard.css';

function GraphemeDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="Home">
        <AppBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <GraphemeBoard />
      </div>
    </>
  );
}

export default GraphemeDashboard;