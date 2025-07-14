import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { commonStyles } from '../styles/common';

function HeroSection({ 
  title, 
  subtitle, 
  primaryButton = null, 
  secondaryButton = null,
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  primaryButtonLink = "/bmi",
  secondaryButtonLink = "/about"
}) {
  return (
    <Box sx={commonStyles.heroSection}>
      <Container maxWidth="lg">
        <Typography variant="h2" fontWeight={700} gutterBottom sx={commonStyles.textShadow}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.95, mb: 6, maxWidth: 700, mx: 'auto', ...commonStyles.subtitleShadow }}>
          {subtitle}
        </Typography>
        {(primaryButton || secondaryButton) && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            {primaryButton || (
              <Button
                component={Link}
                to={primaryButtonLink}
                variant="contained"
                size="large"
                sx={commonStyles.primaryButton}
              >
                {primaryButtonText}
              </Button>
            )}
            {secondaryButton || (
              <Button
                component={Link}
                to={secondaryButtonLink}
                variant="outlined"
                size="large"
                sx={commonStyles.secondaryButton}
              >
                {secondaryButtonText}
              </Button>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default HeroSection; 