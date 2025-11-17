'use client';

import React from 'react';
import { Box, VStack, HStack, Text, Avatar } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface TestimonialCardProps {
  client: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  category: 'b2b' | 'b2c';
  projectType?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  client,
  role,
  company,
  quote,
  avatar,
  rating,
  category,
  projectType
}) => {
  return (
    <Box
      bg="rgba(255,255,255,0.03)"
      backdropFilter="blur(30px)"
      borderRadius="xl"
      border="2px solid rgba(0,198,255,0.2)"
      p={{ base: 4, md: 5 }}
      boxShadow="0 10px 30px rgba(0,198,255,0.1)"
      position="relative"
    >
      <VStack spacing={{ base: 2, md: 3 }} align="flex-start">
        <HStack w="100%" justify="space-between">
          <Box
            px={2.5}
            py={1}
            bg="rgba(0,198,255,0.08)"
            borderRadius="md"
            border="1px solid rgba(0,198,255,0.25)"
          >
            <Text fontSize="xs" fontWeight="700" color="cyan.300">
              {category === 'b2b' ? '🏢 B2B' : '💍 B2C'}
            </Text>
          </Box>

          {projectType && (
            <Text fontSize="xs" color="whiteAlpha.500" fontWeight="600">
              {projectType}
            </Text>
          )}
        </HStack>

        <HStack spacing={0.5}>
          {[...Array(rating)].map((_, i) => (
            <MotionBox
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <Text fontSize={{ base: "sm", md: "md" }} color="yellow.400">★</Text>
            </MotionBox>
          ))}
        </HStack>

        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="white"
          fontWeight="500"
          lineHeight="1.6"
          fontStyle="italic"
          noOfLines={3}
        >
          "{quote}"
        </Text>

        <HStack spacing={3} pt={1} w="100%">
          <Avatar
            size="sm"
            name={client}
            bg="cyan.500"
            color="white"
            fontWeight="900"
          >
            {avatar}
          </Avatar>

          <VStack align="flex-start" spacing={0} flex={1}>
            <Text fontSize="sm" fontWeight="700" color="white">
              {client}
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              {role} · {company}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TestimonialCard;