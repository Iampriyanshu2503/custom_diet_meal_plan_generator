import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function SimpleTest() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      bgcolor: 'primary.main',
      color: 'white',
      p: 4
    }}>
      <Typography variant="h2" gutterBottom>
        NutriPlan is Working! 🎉
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
        Your personalized meal planning application is ready to use.
      </Typography>
      <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main' }}>
        Get Started
      </Button>
    </Box>
  );
}

export default SimpleTest; 