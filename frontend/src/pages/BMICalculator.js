import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { Typography, Alert, Box, Container, Paper, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { bmiCategories } from '../constants/data';

function BMICalculator() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create user');
      // Redirect to meal plan page with user ID
      navigate(`/mealplan?id=${data.user._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ color: 'white', py: 8, px: 2, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight={700} gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            BMI Calculator
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Enter your details to calculate your BMI and get a personalized meal plan
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 6, px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Form Section */}
            <Grid item xs={12} lg={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
                <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                  Calculate Your BMI
                </Typography>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                <UserForm onSubmit={handleSubmit} loading={loading} />
              </Paper>
            </Grid>

            {/* Info Section */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={600} color="white" gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  Understanding BMI Categories
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)" sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  BMI helps us understand your body composition and create the perfect meal plan for your goals
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {bmiCategories.map((category, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.95)', 
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-4px)' }
                    }}>
                      <Grid container>
                        <Grid item xs={12} sm={4}>
                          <Box
                            sx={{
                              height: 120,
                              backgroundImage: `url(${category.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(45deg, ${category.color}80, ${category.color}40)`,
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: category.color }}>
                              {category.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                              {category.range}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {category.description}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Additional Info Section */}
      <Box sx={{ py: 6, px: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Why Calculate Your BMI?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              BMI (Body Mass Index) is a simple and effective way to assess your body weight relative to your height. 
              It helps us understand your current health status and create personalized nutrition recommendations 
              that align with your specific goals, whether that's weight loss, maintenance, or healthy weight gain.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default BMICalculator; 