'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Box, VStack, HStack, Text, Button, Icon } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiCheck, FiAward, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionText = motion(Text);

interface ServiceCTAProps {
  onContactClick?: () => void;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({ onContactClick }) => {
  const [yearsCount, setYearsCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    const targetYears = 10;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = duration / steps;
    const stepValue = targetYears / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.min(Math.floor(currentStep * stepValue), targetYears);
      setYearsCount(newValue);

      if (currentStep >= steps) {
        clearInterval(interval);
        setYearsCount(targetYears);
      }
    }, increment);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <Box ref={ref}>
      <MotionBox
        bg="rgba(255,255,255,0.03)"
        backdropFilter="blur(30px)"
        borderRadius="2xl"
        border="2px solid rgba(0,198,255,0.3)"
        p={{ base: 8, md: 10 }}
        maxW="800px"
        mx="auto"
        boxShadow="0 20px 60px rgba(0,198,255,0.15)"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        _hover={{
          borderColor: "rgba(0,198,255,0.5)",
          boxShadow: "0 25px 80px rgba(0,198,255,0.25)"
        }}
      >
        <VStack spacing={6}>
          {/* Highlight: 10 Jahre Erfahrung */}
          <VStack spacing={2}>
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HStack spacing={2} justify="center" mb={2}>
                <Icon as={FiClock} w={6} h={6} color="cyan.400" />
                <Text
                  fontSize={{ base: "2xl", md: "4xl" }}
                  fontWeight="900"
                  bgGradient="linear(to-r, cyan.300, cyan.500)"
                  bgClip="text"
                  lineHeight="1"
                >
                  {yearsCount}+
                </Text>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="700"
                  color="white"
                  lineHeight="1"
                >
                  Jahre
                </Text>
              </HStack>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="600"
                color="cyan.300"
                textAlign="center"
                letterSpacing="1px"
                textTransform="uppercase"
              >
                Professionelle Erfahrung
              </Text>
            </MotionBox>
          </VStack>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color="white"
            textAlign="center"
          >
            Ihr Projekt ist nicht dabei?
          </Text>
          
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="whiteAlpha.700"
            textAlign="center"
            maxW="600px"
            lineHeight="1.7"
          >
            Kontaktieren Sie uns für individuelle Lösungen. Mit über {yearsCount} Jahren Erfahrung realisieren wir auch Ihr außergewöhnliches Projekt.
          </Text>
          
          <Button
            onClick={onContactClick}
            bgGradient="linear(to-r, cyan.400, cyan.600)"
            color="white"
            border="2px solid rgba(0,198,255,0.4)"
            boxShadow="0 4px 24px rgba(0,198,255,0.3)"
            w={{ base: "100%", md: "auto" }}
            minW={{ md: "220px" }}
            h="52px"
            fontSize="md"
            fontWeight="700"
            display="flex"
            alignItems="center"
            gap={2}
            _hover={{
              bgGradient: "linear(to-r, cyan.300, cyan.500)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 32px rgba(0,198,255,0.4)"
            }}
            _active={{
              transform: "translateY(0)"
            }}
          >
            <Icon as={FiMail} w={5} h={5} />
            Jetzt Anfragen
          </Button>

          <HStack spacing={4} flexWrap="wrap" justify="center" pt={2}>
            <Box
              px={4}
              py={2}
              bg="rgba(0,198,255,0.1)"
              borderRadius="lg"
              border="1px solid rgba(0,198,255,0.3)"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={FiCheck} w={4} h={4} color="cyan.300" />
              <Text fontSize="xs" fontWeight="700" color="cyan.300">
                EU-zertifiziert A2
              </Text>
            </Box>
            <Box
              px={4}
              py={2}
              bg="rgba(0,198,255,0.1)"
              borderRadius="lg"
              border="1px solid rgba(0,198,255,0.3)"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={FiAward} w={4} h={4} color="cyan.300" />
              <Text fontSize="xs" fontWeight="700" color="cyan.300">
                Professionell & Versichert
              </Text>
            </Box>
          </HStack>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default ServiceCTA;