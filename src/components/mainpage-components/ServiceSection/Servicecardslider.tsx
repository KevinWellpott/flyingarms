'use client';

import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  badge?: string;
}

interface ServiceCardSliderProps {
  services: Service[];
}

const ServiceCardSlider: React.FC<ServiceCardSliderProps> = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  const currentService = services[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (info.offset.x < -swipeThreshold) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };

  return (
    <Box position="relative" w="100%">
      <Box position="relative" minH="380px">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <MotionBox
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            position="absolute"
            w="100%"
            style={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <Box
              bg="rgba(255,255,255,0.03)"
              backdropFilter="blur(30px)"
              borderRadius="xl"
              border="2px solid rgba(0,198,255,0.2)"
              p={5}
              boxShadow="0 10px 30px rgba(0,198,255,0.1)"
              position="relative"
            >
              {currentService.badge && (
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
                  {currentService.badge}
                </Badge>
              )}

              <VStack align="flex-start" spacing={3}>
                <Box
                  fontSize="3xl"
                  w="50px"
                  h="50px"
                  bg="rgba(0,198,255,0.1)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid rgba(0,198,255,0.2)"
                >
                  {currentService.icon}
                </Box>

                <Text fontSize="lg" fontWeight="700" color="white">
                  {currentService.title}
                </Text>

                <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.6">
                  {currentService.description}
                </Text>

                <VStack align="flex-start" spacing={1.5} w="100%" pt={2}>
                  {currentService.features.map((feature, i) => (
                    <HStack key={i} spacing={2}>
                      <Box w="4px" h="4px" bg="cyan.400" borderRadius="full" />
                      <Text fontSize="xs" color="whiteAlpha.600">
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </MotionBox>
        </AnimatePresence>
      </Box>

      <HStack spacing={2} justify="center" mt={-6}>
        {services.map((_, index) => (
          <Box
            key={index}
            w={index === currentIndex ? "24px" : "6px"}
            h="6px"
            borderRadius="full"
            bg={index === currentIndex ? "cyan.400" : "rgba(255,255,255,0.2)"}
            cursor="pointer"
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            transition="all 0.3s"
          />
        ))}
      </HStack>
    </Box>
  );
};

export default ServiceCardSlider;