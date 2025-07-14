import React from 'react';
import { Box, Typography, Container, Paper, Grid, Card, CardContent } from '@mui/material';

function About() {
  const features = [
    {
      title: "Personalized Nutrition",
      description: "Our algorithm creates custom meal plans based on your unique BMI, age, gender, and activity level.",
      icon: "🎯"
    },
    {
      title: "Scientific Approach",
      description: "Based on established nutritional science and BMI guidelines for optimal health outcomes.",
      icon: "🔬"
    },
    {
      title: "Easy to Use",
      description: "Simple form interface that takes just minutes to complete and get your personalized plan.",
      icon: "⚡"
    },
    {
      title: "Comprehensive Plans",
      description: "Detailed meal breakdowns with calorie distribution and macro nutrient percentages.",
      icon: "📊"
    }
  ];

  const team = [
    {
      name: "Nutrition Experts",
      role: "Dietary Science",
      description: "Our team includes certified nutritionists and dietitians who ensure accurate recommendations."
    },
    {
      name: "Software Engineers",
      role: "Technology",
      description: "Experienced developers who built this platform with modern web technologies."
    },
    {
      name: "Health Professionals",
      role: "Medical Advisory",
      description: "Medical professionals who validate our algorithms and ensure safety standards."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              About Our Meal Planner
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              We're passionate about helping people achieve their health goals through personalized nutrition planning
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 6, borderRadius: 3, bgcolor: 'white' }}>
            <Typography variant="h3" textAlign="center" fontWeight={600} color="text.primary" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              To make personalized nutrition accessible to everyone
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              We believe that everyone deserves access to personalized nutrition guidance. Our platform combines 
              scientific research with modern technology to create custom meal plans that fit your unique needs. 
              Whether you're looking to lose weight, maintain your current weight, or gain weight healthily, 
              our BMI-based algorithm provides you with a comprehensive nutrition plan tailored to your goals.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight={600} color="text.primary" gutterBottom>
            What Makes Us Different
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Our unique approach to personalized nutrition planning
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%', bgcolor: '#f8fafc', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>{feature.icon}</Typography>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: 8, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight={600} color="text.primary" gutterBottom>
            Our Team
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Dedicated professionals committed to your health and nutrition
          </Typography>
          
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {member.role}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {member.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Technology Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ p: 6, borderRadius: 3, bgcolor: '#f8fafc' }}>
            <Typography variant="h3" textAlign="center" fontWeight={600} color="text.primary" gutterBottom>
              Built with Modern Technology
            </Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              Our platform uses cutting-edge technologies for the best user experience
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>⚛️</Typography>
                  <Typography variant="h6" fontWeight={600}>React.js</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Modern frontend framework for responsive user interface
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>🟢</Typography>
                  <Typography variant="h6" fontWeight={600}>Node.js</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Powerful backend server for reliable data processing
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h4" color="primary" gutterBottom>🍃</Typography>
                  <Typography variant="h6" fontWeight={600}>MongoDB</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flexible database for storing user profiles and meal plans
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Join thousands of users who have transformed their nutrition with our personalized meal plans
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Get started today and take the first step towards a healthier lifestyle!
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About; 