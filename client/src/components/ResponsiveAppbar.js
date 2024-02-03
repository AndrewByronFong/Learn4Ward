import React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import ReusableButton from './SignupLoginButtons';
import ScramblingText from './ScramblingTitle';
import '../styles/components/Appbar.css';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" className="appbar-container">
      <Stack display="flex" direction="row" padding='10px' spacing={2} justifyContent="start">
        <ScramblingText onClick={handleLogoClick} text="Learn4Ward" />
        <div className='divider'></div>
        {location.pathname === '/' && (
          <>
            <ReusableButton text="Sign Up" to="/signup" />
            <ReusableButton text="Login" to="/login" />
          </>
        )}
      </Stack>
    </AppBar>
  );
}

export default ResponsiveAppBar;
