'use client';

import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Container, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiShield, FiVideo, FiCheck } from 'react-icons/fi';
import TestimonialSlider from '../../components/mainpage-components/TestimonialSection/TestimonialSlider';
import TestimonialCard from '../../components/mainpage-components/TestimonialSection/Testimonialcard';

const MotionBox = motion(Box);

// Offizielles mehrfarbiges Google "G"
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

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

  // Load Review Widget Script
  useEffect(() => {
    const scriptId = 'reviewconnect-widget-script';
    
    // Check if script already exists
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://app.reviewconnect.me/embed/fCN7J5lVg3k4ZdRazSbT3dJhMD6JMMlt/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove script on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

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
              Von Jägermeister bis hin zu NewYorker wir haben für alle Branchen und Anforderungen die passende Lösung.
            </Text>
          </MotionBox>

          {showOrbit && (
            <MotionBox 
              display="flex" 
              justifyContent="center"
              alignItems="center"
              w="100%"
              mx="auto"
              mb={{ base: 6, md: 8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <TestimonialSlider
                clients={50}
                projects={500}
                satisfaction={100}
                animateStats={true}
              />
            </MotionBox>
          )}

          {/* Google Bewertungen */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            mt={{ base: -2, md: -4 }}
            mb={{ base: 4, md: 6 }}
          >
            <Button
              as="a"
              href="https://share.google/uoUncBYMaDAVp3MO4"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              h={{ base: "48px", md: "52px" }}
              px={{ base: 6, md: 8 }}
              bg="rgba(255,255,255,0.04)"
              color="white"
              border="1px solid rgba(0,198,255,0.3)"
              borderRadius="xl"
              backdropFilter="blur(20px)"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="700"
              leftIcon={<GoogleIcon />}
              _hover={{
                bg: "rgba(0,198,255,0.1)",
                borderColor: "rgba(0,198,255,0.6)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 24px rgba(0,198,255,0.25)"
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.3s ease"
            >
              Google Bewertungen
            </Button>
          </MotionBox>

          {/* Review Widget */}
          <MotionBox
            w="100%"
            maxW="800px"
            mx="auto"
            mb={{ base: 8, md: 12 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              id="reviews-widget-862"
              w="100%"
              minH={{ base: "400px", md: "500px" }}
            />
          </MotionBox>

         
        </VStack>
      </Container>
    </Box>
  );
};

export default TestimonialSection;