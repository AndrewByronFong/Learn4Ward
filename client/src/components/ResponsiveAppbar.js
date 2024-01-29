// ResponsiveAppBar.js
import React, { useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from 'react-router-dom';
import ReusableButton from './SignupLoginButtons';
import '../styles/components/Appbar.css';

const ScramblingTitle = ({ text, onClick }) => {
  const titleRef = useRef(null);
  const intervalRef = useRef(null);
  const letters = "Learn4Ward";

  useEffect(() => {
    const onMouseOver = () => {
      let iteration = 0;

      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (titleRef.current) {
          titleRef.current.innerText = titleRef.current.innerText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }

              return letters[Math.floor(Math.random() * 10)];
            })
            .join("");

          if (iteration >= text.length) {
            clearInterval(intervalRef.current);
          }

          iteration += 1 / 4;
        }
      }, 30);
    };

    const titleElement = titleRef.current;

    if (titleElement) {
      titleElement.addEventListener('mouseover', onMouseOver);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (titleElement) {
        titleElement.removeEventListener('mouseover', onMouseOver);
      }
    };
  }, [text]);

  return <p onClick={onClick} ref={titleRef} className="logo-title">{text}</p>;
};

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" className="appbar-container">
      <Stack display="flex" direction="row" padding='10px' spacing={2} justifyContent="start">
        <ScramblingTitle onClick={handleLogoClick} text="Learn4Ward" />
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