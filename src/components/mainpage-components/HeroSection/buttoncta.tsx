import React from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionButton = motion(ChakraButton);

interface ButtonProps extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  buttonSize?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  buttonSize = 'md',
  children,
  ...props
}) => {
  const variants = {
    primary: {
      bg: 'linear-gradient(135deg, #00C6FF 0%, #0B99FF 100%)',
      color: 'white',
      border: '1px solid',
      borderColor: 'cyan.400',
      boxShadow: '0 8px 32px 0 rgba(0, 198, 255, 0.37)',
      backdropFilter: 'blur(8px)',
      _hover: {
        bg: 'linear-gradient(135deg, #00E5FF 0%, #1E88E5 100%)',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px 0 rgba(0, 198, 255, 0.5)',
      },
      _active: {
        transform: 'translateY(0px)',
      }
    },
    secondary: {
      bg: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid',
      borderColor: 'whiteAlpha.300',
      backdropFilter: 'blur(10px)',
      _hover: {
        bg: 'rgba(255, 255, 255, 0.2)',
        borderColor: 'whiteAlpha.400',
        transform: 'translateY(-2px)',
      },
    },
    ghost: {
      bg: 'transparent',
      color: 'cyan.400',
      border: '2px solid',
      borderColor: 'cyan.400',
      _hover: {
        bg: 'rgba(0, 198, 255, 0.1)',
        color: 'white',
        transform: 'translateY(-2px)',
      },
    }
  };

  const sizes = {
    sm: { px: 4, py: 2, fontSize: 'sm' },
    md: { px: 8, py: 4, fontSize: 'md' },
    lg: { px: 12, py: 6, fontSize: 'lg' },
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      borderRadius="xl"
      fontWeight="semibold"
      {...variants[variant]}
      {...sizes[buttonSize]}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default Button;