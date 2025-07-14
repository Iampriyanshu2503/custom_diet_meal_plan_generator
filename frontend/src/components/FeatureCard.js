import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { commonStyles } from '../styles/common';

function FeatureCard({ 
  title, 
  description, 
  icon, 
  image, 
  link, 
  color = "#667eea",
  showImage = true 
}) {
  const cardContent = (
    <>
      {showImage && (
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            ...commonStyles.imageOverlay(color)
          }}
        />
      )}
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        {icon && (
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>{icon}</Typography>
        )}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </>
  );

  if (link) {
    return (
      <Card 
        component={Link}
        to={link}
        sx={{ 
          height: '100%', 
          ...commonStyles.glassCard,
          textDecoration: 'none',
          cursor: 'pointer'
        }}
      >
        {cardContent}
      </Card>
    );
  }

  return (
    <Card sx={{ 
      height: '100%', 
      ...commonStyles.glassCard
    }}>
      {cardContent}
    </Card>
  );
}

export default FeatureCard; 