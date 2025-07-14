import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowForward, Star } from '@mui/icons-material';

function AdvancedFeatureCard({ 
  title, 
  description, 
  icon, 
  image, 
  link, 
  color = "#667eea",
  features = [],
  rating = 4.8
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    initial: { 
      scale: 1, 
      rotateY: 0,
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
    },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: { y: -10 }
  };

  const cardContent = (
    <>
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              height: 220,
              backgroundImage: `url(${image})`,
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
                background: `linear-gradient(135deg, ${color}80, ${color}40)`,
                opacity: 0.8
              }
            }}
          />
        </motion.div>
        
        {/* Floating Icon */}
        <Box
          component={motion.div}
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 60,
            height: 60,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {icon}
        </Box>

        {/* Rating Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            px: 2,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          <Star sx={{ fontSize: 16, color: '#ffd700' }} />
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {rating}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          transition={{ duration: 0.4 }}
        >
          <Typography 
            variant="h5" 
            fontWeight={700} 
            gutterBottom 
            sx={{ 
              mb: 2,
              background: `linear-gradient(45deg, ${color}, ${color}80)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {title}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 3, 
              lineHeight: 1.6,
              fontSize: '1rem'
            }}
          >
            {description}
          </Typography>

          {/* Features List */}
          {features.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  size="small"
                  sx={{
                    mr: 1,
                    mb: 1,
                    background: `${color}15`,
                    color: color,
                    fontWeight: 500,
                    '&:hover': {
                      background: `${color}25`
                    }
                  }}
                />
              ))}
            </Box>
          )}

          {/* Action Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Learn more
            </Typography>
            <IconButton
              component={motion.button}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                background: `linear-gradient(45deg, ${color}, ${color}80)`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(45deg, ${color}80, ${color})`,
                  transform: 'translateX(3px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </motion.div>
      </CardContent>
    </>
  );

  if (link) {
    return (
      <Card
        component={motion.div}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        to={link}
        sx={{
          height: '100%',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            textDecoration: 'none'
          }
        }}
      >
        {cardContent}
      </Card>
    );
  }

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={{
        height: '100%',
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {cardContent}
    </Card>
  );
}

export default AdvancedFeatureCard; 