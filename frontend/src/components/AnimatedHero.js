import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

function AnimatedHero({ title, subtitle, primaryButtonText = "Get Started", secondaryButtonText = "Learn More" }) {
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `
          linear-gradient(135deg, #667eea 0%, #764ba2 100%),
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s ease-in-out infinite'
        }
      }}
    >
      {/* Floating Elements */}
      <Box
        component={motion.div}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 60,
          height: 60,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 40,
          height: 40,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      />

      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          sx={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 2 }}
        >
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              mb: 3,
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </Typography>
          
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            variant="h4"
            sx={{
              opacity: 0.95,
              maxWidth: 800,
              mx: 'auto',
              mb: 6,
              fontWeight: 300,
              lineHeight: 1.4,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
            }}
          >
            {subtitle}
          </Typography>

          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/bmi"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #ffffff, #f8f9fa)',
                color: '#667eea',
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 700,
                borderRadius: '50px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                textTransform: 'none',
                letterSpacing: '0.5px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #f8f9fa, #ffffff)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {primaryButtonText}
            </Button>
            
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.8)',
                borderWidth: '2px',
                color: 'white',
                px: 6,
                py: 2.5,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                textTransform: 'none',
                letterSpacing: '0.5px',
                '&:hover': {
                  borderColor: 'white',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {secondaryButtonText}
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 30,
          height: 50,
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          pt: 1
        }}
      >
        <Box
          sx={{
            width: 4,
            height: 8,
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 2,
            animation: 'scroll 2s infinite'
          }}
        />
      </Box>
    </Box>
  );
}

export default AnimatedHero; 