'use client';

import React from 'react';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  details: string[];
}

interface ProcessStepCardProps {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ 
  step, 
  index, 
  isActive, 
  isCompleted 
}) => {
  const Icon = step.icon;

  return (
    <VStack spacing={3} align="stretch" w="100%"> {/* VStack spacing mittel */}
      <MotionBox
        w="80px" // Avatar
        h="80px" // Avatar
        mx="auto"
        borderRadius="xl" // Cards
        bg={isActive ? "rgba(0,198,255,0.15)" : "rgba(255,255,255,0.03)"}
        border="1px solid" // Standard Border
        borderColor={isActive ? "rgba(0,198,255,0.5)" : "rgba(255,255,255,0.1)"}
        backdropFilter="blur(20px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        boxShadow={isActive ? "0 8px 32px rgba(0,198,255,0.3)" : "none"}
        animate={{
          scale: isActive ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
      >
        {isCompleted && (
          <Box
            position="absolute"
            top="-8px"
            right="-8px"
            w="28px"
            h="28px"
            borderRadius="full" // Rundungen
            bg="green.400"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 4px 12px rgba(34, 197, 94, 0.4)"
          >
            <Box as={FiCheck} color="black" fontWeight="900" size="16px" />
          </Box>
        )}

        {!isCompleted && (
          <Box
            position="absolute"
            top="-8px"
            right="-8px"
            w="28px"
            h="28px"
            borderRadius="full" // Rundungen
            bg={isActive ? "cyan.400" : "rgba(255,255,255,0.2)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs" // Badge Text
            fontWeight="900"
            color={isActive ? "black" : "white"}
            boxShadow={isActive ? "0 0 20px rgba(0,198,255,0.6)" : "none"}
          >
            {step.number}
          </Box>
        )}

        <Box
          as={Icon}
          w="32px"
          h="32px"
          color={isActive ? "cyan.400" : "whiteAlpha.600"}
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" // Smooth Transitions
        />
      </MotionBox>

      <VStack spacing={2} textAlign="center"> {/* VStack spacing klein */}
        <Text
          fontSize={{ base: 'md', md: 'lg' }} // Heading medium
          fontWeight="900"
          color={isActive ? "cyan.300" : "white"}
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" // Smooth Transitions
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif" // System Font
        >
          {step.title}
        </Text>
        
        <HStack spacing={1.5} justify="center" color="whiteAlpha.500">
          <Box as={FiClock} size="12px" />
          <Text fontSize="xs" fontWeight="600"> {/* Badge Text */}
            {step.duration}
          </Text>
        </HStack>

        <Text 
          fontSize={{ base: "sm", md: "md" }} // Code Text
          color="whiteAlpha.700" 
          lineHeight="1.6"
        >
          {step.description}
        </Text>
      </VStack>

      {isActive && (
        <VStack
          spacing={2} // VStack spacing klein
          align="stretch"
          p={{ base: 4, md: 6 }} // Card Padding
          bg="rgba(0,198,255,0.05)"
          borderRadius="md" // Badges
          border="1px solid rgba(0,198,255,0.2)" // Standard Border
          mt={2}
        >
          {step.details.map((detail, i) => (
            <HStack key={i} spacing={2} align="flex-start">
              <Box
                minW="4px"
                h="4px"
                mt={1.5}
                borderRadius="full" // Rundungen
                bg="cyan.400"
              />
              <Text 
                fontSize="xs" // Badge Text
                color="whiteAlpha.800" 
                lineHeight="1.5"
              >
                {detail}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default ProcessStepCard;