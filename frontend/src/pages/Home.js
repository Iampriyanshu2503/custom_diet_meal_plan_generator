import React from 'react';
import { Box, Typography, Grid, Container, Avatar, Card, CardContent, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import { homeFeatures, testimonials } from '../constants/data';

function Home() {



  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection 
        title="Your Personalized Meal Planner"
        subtitle="Get a custom diet plan tailored to your body and lifestyle. Calculate your BMI and receive a meal plan designed just for you!"
      />

      {/* Stats Section */}
      <Box sx={{ py: 6, px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>👥</Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  10K+
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)">
                  Happy Users
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #4caf50, #45a049)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>📈</Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  95%
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)">
                  Success Rate
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #ff9800, #f57c00)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(255, 152, 0, 0.3)'
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>🏆</Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  4.9★
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)">
                  User Rating
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(45deg, #9c27b0, #7b1fa2)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 8px 25px rgba(156, 39, 176, 0.3)'
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>⚡</Typography>
                </Box>
                <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
                  &lt;30s
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.9)">
                  Setup Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" textAlign="center" fontWeight={700} color="white" gutterBottom sx={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}>
            Why Choose NutriPlan?
          </Typography>
          <Typography variant="h5" textAlign="center" color="rgba(255,255,255,0.9)" sx={{ 
            mb: 8, 
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            maxWidth: 800,
            mx: 'auto'
          }}>
            Experience the future of personalized nutrition with AI-powered recommendations
          </Typography>
          
          <Grid container spacing={4}>
            {homeFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <FeatureCard 
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  image={feature.image}
                  link={feature.link}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight={600} color="white" gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            How It Works
          </Typography>
          <Typography variant="h6" textAlign="center" color="rgba(255,255,255,0.9)" sx={{ mb: 6, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Get your personalized meal plan in just 3 simple steps
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.9)', 
                  color: '#667eea', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  1
                </Box>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  Enter Your Details
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  Fill out a simple form with your age, gender, weight, height, and activity level.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.9)', 
                  color: '#667eea', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  2
                </Box>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  Get Your BMI
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  We calculate your BMI and determine your health goals automatically.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(255,255,255,0.9)', 
                  color: '#667eea', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 600,
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                  3
                </Box>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  Receive Your Plan
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                  Get a personalized meal plan with calorie breakdown and macro distribution.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" textAlign="center" fontWeight={700} color="white" gutterBottom sx={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}>
            What Our Users Say
          </Typography>
          <Typography variant="h5" textAlign="center" color="rgba(255,255,255,0.9)" sx={{ 
            mb: 8, 
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            maxWidth: 800,
            mx: 'auto'
          }}>
            Join thousands of satisfied users who have transformed their nutrition journey
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                  }
                }}>
                  <CardContent sx={{ p: 5, textAlign: 'center' }}>
                    {/* Rating Stars */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Typography key={star} sx={{ color: '#ffd700', fontSize: 20 }}>★</Typography>
                      ))}
                    </Box>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      mb: 4, 
                      fontStyle: 'italic', 
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      position: 'relative',
                      '&::before': {
                        content: '"""',
                        fontSize: '3rem',
                        color: '#667eea',
                        position: 'absolute',
                        top: -20,
                        left: -10,
                        fontFamily: 'serif'
                      }
                    }}>
                      {testimonial.text}
                    </Typography>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          width: 60, 
                          height: 60,
                          border: '3px solid #667eea',
                          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
                        }}
                        src={testimonial.image}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700} color="text.primary">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, px: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={600} gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.95, mb: 6, color: 'rgba(255,255,255,0.9)', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              Get your personalized meal plan today and take the first step towards a healthier lifestyle.
            </Typography>
            <Button
              component={Link}
              to="/bmi"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: '#667eea',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: '#f8f9fa', transform: 'translateY(-2px)', boxShadow: '0 6px 25px rgba(0,0,0,0.3)' }
              }}
            >
              Start Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, px: 2, bgcolor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Personalized Meal Planner
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, color: 'rgba(255,255,255,0.8)' }}>
              © 2024 All rights reserved. Made with ❤️ for better health.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 