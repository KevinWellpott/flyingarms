'use client';

import React from 'react';
import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  badge
}) => {
  return (
    <MotionBox whileHover={{ y: -5 }}>
      <Box
        bg="rgba(255,255,255,0.03)"
        backdropFilter="blur(30px)"
        borderRadius="xl"
        border="2px solid rgba(0,198,255,0.2)"
        p={{ base: 5, md: 6 }}
        boxShadow="0 10px 30px rgba(0,198,255,0.1)"
        position="relative"
        h="100%"
        transition="all 0.3s"
        _hover={{
          borderColor: "rgba(0,198,255,0.4)",
          boxShadow: "0 15px 40px rgba(0,198,255,0.2)"
        }}
      >
        {badge && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            bg="rgba(0,198,255,0.15)"
            color="cyan.300"
            fontSize="xs"
            fontWeight="700"
            px={2}
            py={1}
            borderRadius="md"
            border="1px solid rgba(0,198,255,0.3)"
          >
            {badge}
          </Badge>
        )}

        <VStack align="flex-start" spacing={3}>
          <Box
            fontSize={{ base: "3xl", md: "4xl" }}
            w={{ base: "50px", md: "60px" }}
            h={{ base: "50px", md: "60px" }}
            bg="rgba(0,198,255,0.1)"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0,198,255,0.2)"
          >
            {icon}
          </Box>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color="white"
          >
            {title}
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="whiteAlpha.700"
            lineHeight="1.6"
          >
            {description}
          </Text>

          <VStack align="flex-start" spacing={1.5} w="100%" pt={2}>
            {features.map((feature, i) => (
              <HStack key={i} spacing={2}>
                <Box
                  w="4px"
                  h="4px"
                  bg="cyan.400"
                  borderRadius="full"
                />
                <Text fontSize="xs" color="whiteAlpha.600">
                  {feature}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  );
};

export default ServiceCard;