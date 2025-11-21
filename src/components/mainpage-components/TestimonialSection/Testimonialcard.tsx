'use client';

import React from 'react';
import { Box, VStack, HStack, Text, Avatar, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiStar, FiBriefcase, FiHeart } from 'react-icons/fi';

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
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(30px)"
      borderRadius="2xl"
      border="1px solid rgba(0,198,255,0.3)"
      p={{ base: 6, md: 8 }}
      boxShadow="0 20px 60px rgba(0,198,255,0.15), inset 0 0 40px rgba(0,198,255,0.05)"
      position="relative"
      overflow="hidden"
      _hover={{
        borderColor: "rgba(0,198,255,0.5)",
        boxShadow: "0 25px 70px rgba(0,198,255,0.25), inset 0 0 40px rgba(0,198,255,0.08)",
        transform: "translateY(-2px)",
      }}
      transition="all 0.3s ease"
    >
      {/* Gradient overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="2px"
        bgGradient="linear(to-r, transparent, cyan.400, transparent)"
        opacity={0.5}
      />

      <VStack spacing={{ base: 4, md: 5 }} align="flex-start">
        <HStack w="100%" justify="space-between" flexWrap="wrap" gap={2}>
          <Badge
            px={3}
            py={1.5}
            bg={category === 'b2b' ? "rgba(0,198,255,0.15)" : "rgba(251, 113, 133, 0.15)"}
            borderRadius="lg"
            border="1px solid"
            borderColor={category === 'b2b' ? "rgba(0,198,255,0.3)" : "rgba(251, 113, 133, 0.3)"}
            display="flex"
            alignItems="center"
            gap={1.5}
          >
            {category === 'b2b' ? (
              <FiBriefcase size={12} color="#00C6FF" />
            ) : (
              <FiHeart size={12} color="#FB7185" />
            )}
            <Text fontSize="xs" fontWeight="700" color={category === 'b2b' ? "cyan.300" : "pink.300"}>
              {category === 'b2b' ? 'B2B' : 'B2C'}
            </Text>
          </Badge>

          {projectType && (
            <Text 
              fontSize="xs" 
              color="rgba(255,255,255,0.6)" 
              fontWeight="600"
              px={2}
              py={1}
              bg="rgba(255,255,255,0.05)"
              borderRadius="md"
            >
              {projectType}
            </Text>
          )}
        </HStack>

        <HStack spacing={1}>
          {[...Array(rating)].map((_, i) => (
            <MotionBox
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              <Box as={FiStar} size={18} color="#FCD34D" fill="#FCD34D" />
            </MotionBox>
          ))}
        </HStack>

        <Box position="relative" pl={6} pr={6}>
          <Text
            fontSize="5xl"
            color="rgba(0,198,255,0.2)"
            position="absolute"
            top="-8px"
            left="0"
            fontFamily="serif"
            lineHeight="1"
            fontWeight="300"
          >
            "
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="white"
            fontWeight="400"
            lineHeight="1.7"
            fontStyle="italic"
            position="relative"
            zIndex={1}
          >
            {quote}
          </Text>
          <Text
            fontSize="5xl"
            color="rgba(0,198,255,0.2)"
            position="absolute"
            bottom="-20px"
            right="0"
            fontFamily="serif"
            lineHeight="1"
            fontWeight="300"
          >
            "
          </Text>
        </Box>

        <HStack spacing={4} pt={2} w="100%" borderTop="1px solid rgba(0,198,255,0.1)">
          <Avatar
            size="md"
            name={client}
            bgGradient="linear(to-br, cyan.400, cyan.600)"
            color="white"
            fontWeight="900"
            boxShadow="0 4px 20px rgba(0,198,255,0.3)"
          >
            {avatar}
          </Avatar>

          <VStack align="flex-start" spacing={0.5} flex={1}>
            <Text fontSize="md" fontWeight="700" color="white">
              {client}
            </Text>
            <Text fontSize="sm" color="rgba(255,255,255,0.6)" fontWeight="500">
              {role}
            </Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.5)">
              {company}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default TestimonialCard;