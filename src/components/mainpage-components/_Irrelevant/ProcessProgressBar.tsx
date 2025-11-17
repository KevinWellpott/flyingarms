'use client';

import React from 'react';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ProcessProgressBarProps {
  activeStep: number;
  totalSteps: number;
}

const ProcessProgressBar: React.FC<ProcessProgressBarProps> = ({
  activeStep,
  totalSteps
}) => {
  const progress = ((activeStep + 1) / totalSteps) * 100;

  return (
    <VStack spacing={3} w="100%" maxW="600px">
      <HStack justify="space-between" w="100%">
        <Text 
          fontSize="sm"
          fontWeight="700" 
          color="cyan.400"
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
        >
          SCHRITT {activeStep + 1} VON {totalSteps}
        </Text>
        <Text 
          fontSize="sm"
          fontWeight="600" 
          color="whiteAlpha.500"
        >
          {Math.round(progress)}%
        </Text>
      </HStack>

      <Box 
        w="100%" 
        h="6px" 
        bg="rgba(255,255,255,0.1)" 
        borderRadius="full"
        overflow="hidden"
      >
        <MotionBox
          h="100%"
          bg="linear-gradient(to-r, cyan.400, cyan.600)"
          borderRadius="full"
          boxShadow="0 0 20px rgba(0,198,255,0.6)"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </Box>
    </VStack>
  );
};

export default ProcessProgressBar;