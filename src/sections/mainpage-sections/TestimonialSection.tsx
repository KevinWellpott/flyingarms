'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Container } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialSlider from '../../components/mainpage-components/TestimonialSection/TestimonialSlider';
import TestimonialCard from '../../components/mainpage-components/TestimonialSection/Testimonialcard';

const MotionBox = motion(Box);

interface Testimonial {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
  category: 'b2b' | 'b2c';
  projectType?: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  showOrbit?: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials = [],
  autoPlay = true,
  showOrbit = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const defaultTestimonials: Testimonial[] = [
    {
      id: "1",
      client: "Michael Schmidt",
      role: "Projektleiter",
      company: "Volkswagen AG",
      quote: "Die Luftaufnahmen für unser Werksgelände waren sensationell. Professionell, pünktlich und mit einem Auge fürs Detail, das unsere Erwartungen übertroffen hat.",
      avatar: "MS",
      rating: 5,
      category: "b2b",
      projectType: "Industriefilm"
    },
    {
      id: "2",
      client: "Sarah Weber",
      role: "Marketing Director",
      company: "Siemens",
      quote: "Beeindruckende Drohnenaufnahmen für unsere Produktpräsentation. Das Team hat unsere Vision perfekt umgesetzt und uns Material geliefert, das wirklich heraussticht.",
      avatar: "SW",
      rating: 5,
      category: "b2b",
      projectType: "Produktvideo"
    },
    {
      id: "3",
      client: "Laura & Thomas",
      role: "Brautpaar",
      company: "Hochzeit 2024",
      quote: "Unsere Hochzeit aus der Vogelperspektive war einfach magisch! Die Aufnahmen sind so emotional und wunderschön - wir schauen sie immer wieder an.",
      avatar: "L&T",
      rating: 5,
      category: "b2c",
      projectType: "Hochzeitsvideo"
    },
    {
      id: "4",
      client: "Dr. Andreas Müller",
      role: "Facility Manager",
      company: "BMW Group",
      quote: "Für unsere Standortdokumentation genau das richtige Team. Schnelle Abwicklung, höchste Qualität und faire Preise. Gerne wieder!",
      avatar: "AM",
      rating: 5,
      category: "b2b",
      projectType: "Dokumentation"
    },
    {
      id: "5",
      client: "Jennifer Klein",
      role: "Event Planerin",
      company: "Wedding Dreams",
      quote: "Die Drohnenaufnahmen haben unseren Events eine völlig neue Dimension gegeben. Unsere Kunden sind begeistert von den spektakulären Perspektiven!",
      avatar: "JK",
      rating: 5,
      category: "b2c",
      projectType: "Event Coverage"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, displayTestimonials.length]);

  const currentTestimonial = displayTestimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
    } else if (info.offset.x < -swipeThreshold) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }
  };

  return (
    <Box
      width="100%"
      py={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.02"
        backgroundImage="linear-gradient(rgba(0,198,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.3) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        style={{
          perspective: "1000px",
          transform: "rotateX(60deg) scale(2)"
        }}
      />

  

      <Container maxW="container.lg" px={{ base: 4, md: 6 }} position="relative" zIndex={2}>
        <VStack spacing={{ base: 6, md: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            w="100%"
          >
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
              mb={3}
            >
              Kundenstimmen
            </Text>

            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={2}
            >
              Was unsere Kunden{" "}
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                sagen
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              mx="auto"
            >
              Von Fortune 500 Unternehmen bis zu unvergesslichen Hochzeiten
            </Text>
          </MotionBox>

          {showOrbit && (
            <Box display="flex" justifyContent="center" w="100%" mb={{ base: 4, md: 6 }}>
              <TestimonialSlider
                clients={50}
                projects={200}
                satisfaction={98}
                animateStats={true}
              />
            </Box>
          )}

          <Box
            position="relative"
            w="100%"
            maxW="800px"
            mx="auto"
          >
            <Box position="relative" minH={{ base: "320px", md: "280px" }}>
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
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3 }
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
                  <TestimonialCard
                    client={currentTestimonial.client}
                    role={currentTestimonial.role}
                    company={currentTestimonial.company}
                    quote={currentTestimonial.quote}
                    avatar={currentTestimonial.avatar}
                    rating={currentTestimonial.rating}
                    category={currentTestimonial.category}
                    projectType={currentTestimonial.projectType}
                  />
                </MotionBox>
              </AnimatePresence>
            </Box>

            <HStack
              spacing={2}
              justify="center"
              mt={{ base: -12, md: -8 }}
            >
              {displayTestimonials.map((_, index) => (
                <Box
                  key={index}
                  w={index === currentIndex ? "32px" : "8px"}
                  h="8px"
                  borderRadius="full"
                  bg={index === currentIndex ? "cyan.400" : "rgba(255,255,255,0.2)"}
                  cursor="pointer"
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  transition="all 0.3s"
                  _hover={{ bg: "cyan.300" }}
                />
              ))}
            </HStack>
          </Box>

          <MotionBox
            mt={{ base: 8, md: 10 }}
            w="100%"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HStack
              justify="center"
              p={{ base: 4, md: 5 }}
              bg="rgba(255,255,255,0.02)"
              backdropFilter="blur(20px)"
              borderRadius="xl"
              border="1px solid rgba(255,255,255,0.1)"
              flexWrap="wrap"
              spacing={{ base: 3, md: 4 }}
              gap={3}
            >
              <HStack spacing={2}>
                <Text fontSize="xl">🏆</Text>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="xs" fontWeight="700" color="yellow.400">
                    Top Rated
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.500">
                    5.0 Sterne
                  </Text>
                </VStack>
              </HStack>

              <Box h="30px" w="1px" bg="rgba(255,255,255,0.1)" display={{ base: "none", md: "block" }} />

              <HStack spacing={2}>
                <Text fontSize="xl">✓</Text>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="xs" fontWeight="700" color="green.400">
                    EU-Zertifiziert
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.500">
                    A2 Lizenz
                  </Text>
                </VStack>
              </HStack>

              <Box h="30px" w="1px" bg="rgba(255,255,255,0.1)" display={{ base: "none", md: "block" }} />

              <HStack spacing={2}>
                <Text fontSize="xl">🛡️</Text>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="xs" fontWeight="700" color="cyan.400">
                    Versichert
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.500">
                    2M€ Haftung
                  </Text>
                </VStack>
              </HStack>

              <Box h="30px" w="1px" bg="rgba(255,255,255,0.1)" display={{ base: "none", md: "block" }} />

              <HStack spacing={2}>
                <Text fontSize="xl">📹</Text>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="xs" fontWeight="700" color="cyan.400">
                    4K Quality
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.500">
                    60fps Video
                  </Text>
                </VStack>
              </HStack>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default TestimonialSection;