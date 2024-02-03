// SignupLoginButtons.js
import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const SignupLoginButtons = styled(Button)(({ theme }) => ({
  color: '#74b8a0',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '1',
  fontSize: '19px',
  fontFamily: 'sans-serif',
  boxShadow: 'none',
  padding: '10px',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#c9e3da',
    color: '#74b8a0',
    border: 'none',
  },}));

const ReusableButton = ({ text, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <SignupLoginButtons variant="contained" onClick={handleClick}>
      {text}
    </SignupLoginButtons>
  );
};

export default ReusableButton;
