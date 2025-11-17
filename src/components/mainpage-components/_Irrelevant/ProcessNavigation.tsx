'use client';

import React from 'react';
import { Box, HStack, Button } from '@chakra-ui/react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface ProcessNavigationProps {
  activeStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}

const ProcessNavigation: React.FC<ProcessNavigationProps> = ({
  activeStep,
  totalSteps,
  onNext,
  onPrev
}) => {
  return (
    <Box w="100%" maxW="600px" pt={{ base: 0, md: 0 }}>
      <HStack spacing={3} w="100%">
        <Button
          onClick={onPrev}
          isDisabled={activeStep === 0}
          size="lg"
          h="56px"
          w="50%"
          bg={activeStep === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,198,255,0.1)"}
          color={activeStep === 0 ? "whiteAlpha.400" : "cyan.300"}
          border="1px solid" // Standard Border
          borderColor={activeStep === 0 ? "rgba(255,255,255,0.1)" : "rgba(0,198,255,0.3)"}
          borderRadius="xl" // Cards
          fontWeight="900"
          fontSize="sm" // Button/Body Text
          leftIcon={<Box as={FiArrowLeft} />}
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
          _hover={activeStep !== 0 ? {
            bg: "rgba(0,198,255,0.2)",
          } : {}}
          _active={{}}
          _focus={{}}
        >
          Zurück
        </Button>

        <Button
          onClick={onNext}
          isDisabled={activeStep === totalSteps - 1}
          size="lg"
          h="56px"
          w="50%"
          bg={activeStep === totalSteps - 1 ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"}
          color="white"
          borderRadius="xl" // Cards
          fontWeight="900"
          fontSize="sm" // Button/Body Text
          boxShadow={activeStep !== totalSteps - 1 ? "0 4px 24px rgba(0,198,255,0.4)" : "none"}
          rightIcon={<Box as={FiArrowRight} />}
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
          _hover={activeStep !== totalSteps - 1 ? {
            boxShadow: "0 6px 32px rgba(0,198,255,0.5)"
          } : {}}
          _active={{}}
          _focus={{}}
        >
          {activeStep === totalSteps - 1 ? "Fertig" : "Weiter"}
        </Button>
      </HStack>
    </Box>
  );
};

export default ProcessNavigation;