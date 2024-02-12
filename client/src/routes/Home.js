// Home.js
import React from 'react';
import AppBar from '../components/ResponsiveAppbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import '../styles/Home.css';

function Home() {
  return (
    <Box className="home">
      <AppBar />
      <Container className="overall-container">
        <img src="/background_ai.png" alt="Background" className="background-image" />
        <Box className="text-container">
          <Typography variant="h2" component="h1" gutterBottom>
            Power Phonetics Learning With AI
          </Typography>
        </Box>
        <Paper className="text-container" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}>
        <Typography variant="heading" style={{ padding: '1%', fontSize: '21px' }} paragraph>
          In an era where technological advancements have transformed numerous educational methodologies, the approach to teaching students with dyslexia remains unchanged and outdated.
          </Typography>
        <Typography variant="heading" style={{ padding: '1%', fontSize: '21px' }} paragraph>
          OUR MISSION is to transform the technological landscape for students with dyslexia.
          </Typography>
        <Typography variant="heading" style={{ padding: '1%', fontSize: '21px' }} paragraph>
          We provide AI-enhanced tools and expert-crafter solutions to empower students with dyslexia in order to create a more accessible and equitable future.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;
