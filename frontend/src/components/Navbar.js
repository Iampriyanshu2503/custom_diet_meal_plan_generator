import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Navbar({ darkMode, setDarkMode, isLoggedIn, setIsLoggedIn }) {
  // Real-time clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle dark mode toggle
  const handleThemeToggle = () => {
    setDarkMode(dm => {
      localStorage.setItem('profileDarkMode', !dm);
      return !dm;
    });
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'none',
        transition: 'none'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          px: 0,
          minHeight: '64px'
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            NutriPlan
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1 }, 
            flexWrap: 'nowrap',
            alignItems: 'center'
          }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/bmi" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              BMI Calculator
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/mealplan" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Meal Plan
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/progress" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Progress
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/profile" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Profile
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/about" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              About
            </Button>
            {/* Show Login/Signup only if not logged in */}
            {!isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/login" sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Login</Button>
                <Button color="inherit" component={Link} to="/profile-setup" sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Sign Up</Button>
              </>
            )}
            {/* Real-time clock display */}
            <Typography variant="body1" sx={{ ml: 2, fontWeight: 500, letterSpacing: 1 }}>
              {currentTime.toLocaleTimeString()}
            </Typography>
            {/* Dark mode toggle button */}
            <Button
              color="inherit"
              onClick={handleThemeToggle}
              sx={{ ml: 2, fontWeight: 700, fontSize: { xs: '1.2rem', sm: '1.3rem' } }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌙' : '☀️'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 