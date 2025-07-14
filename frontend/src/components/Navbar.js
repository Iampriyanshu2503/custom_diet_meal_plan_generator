import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Navbar() {
  // Real-time clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
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
              to="/about" 
              sx={{ 
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              About
            </Button>
            {/* Real-time clock display */}
            <Typography variant="body1" sx={{ ml: 2, fontWeight: 500, letterSpacing: 1 }}>
              {currentTime.toLocaleTimeString()}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 