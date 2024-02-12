import React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import ReusableButton from './SignupLoginButtons';
import ScramblingText from './ScramblingTitle';
import '../styles/components/ResponsiveAppbar.css';

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" className={`appbar-container ${location.pathname === '/' ? 'transparent' : ''}`}>
      <Stack
        display="flex"
        direction="row"
        padding="10px"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {location.pathname !== '/' && (
          <>
            <Stack direction="row" alignItems="center">
              <img
                src="/new_icon.png"
                alt="Logo"
                onClick={handleLogoClick}
                className="logo"
              />
              <ScramblingText onClick={handleLogoClick} text="Learn4Ward" className="logo-title" />
              <div className='divider'></div>
            </Stack>
          </>
        )}
        {location.pathname === '/' && (
          <>
            <ScramblingText onClick={handleLogoClick} text="Learn4Ward" className="logo-title" />
            <Stack direction="row" flex={1} justifyContent="flex-end">
              <ReusableButton text="Sign Up" to="/signup" />
              <ReusableButton text="Login" to="/login" />
            </Stack>
          </>
        )}
      </Stack>
    </AppBar>
  );
}

export default ResponsiveAppBar;
