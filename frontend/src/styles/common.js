// Common styles used across the application
export const commonStyles = {
  // Background gradient - updated to match new design
  backgroundGradient: {
    background: '#FAFAFA', // Soft white background
  },

  // Glass morphism card style
  glassCard: {
    bgcolor: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
    }
  },

  // Text shadow for white text on gradient background
  textShadow: {
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },

  // Subtitle text shadow
  subtitleShadow: {
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
  },

  // Hero section styles
  heroSection: {
    color: 'white',
    py: 12,
    px: 2,
    textAlign: 'center'
  },

  // Section container
  sectionContainer: {
    py: 8,
    px: 2
  },

  // Feature card image overlay
  imageOverlay: (color = "#4CAF50") => ({
    height: 200,
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
      background: `linear-gradient(45deg, ${color}80, ${color}40)`,
      opacity: 0.7
    }
  }),

  // Button styles - updated to match new design
  primaryButton: {
    background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
    color: 'white',
    px: 6,
    py: 2,
    fontSize: '1.2rem',
    fontWeight: 600,
    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 25px rgba(76, 175, 80, 0.4)'
    }
  },

  secondaryButton: {
    borderColor: '#4CAF50',
    color: '#4CAF50',
    px: 6,
    py: 2,
    fontSize: '1.2rem',
    fontWeight: 600,
    '&:hover': {
      borderColor: '#388E3C',
      backgroundColor: '#E8F5E8',
    }
  },

  // Card styles for the new design
  cardStyle: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
    border: '1px solid #E9ECEF',
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-5px)',
    }
  },

  // Progress bar styles
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8F5E8',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#4CAF50',
    },
  },

  // Gradient backgrounds for different sections
  gradientBackgrounds: {
    green: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
    blue: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
    orange: 'linear-gradient(135deg, #FFF3E0 0%, #FCE4EC 100%)',
    purple: 'linear-gradient(135deg, #F3E5F5 0%, #E8F5E8 100%)',
  }
}; 