'use client';

import React from 'react';
import { Box, Container, VStack, Text, SimpleGrid, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiVideo, 
  FiImage, 
  FiFilm, 
  FiHome, 
  FiHeart, 
  FiSearch 
} from 'react-icons/fi';
import ServiceCard from '../../components/mainpage-components/ServiceSection/Servicecard';
import ServiceCardSlider from '../../components/mainpage-components/ServiceSection/Servicecardslider';
import ServiceCTA from '../../components/mainpage-components/ServiceSection/Servicecta';

const MotionBox = motion(Box);

const services = [
  {
    icon: FiVideo,
    title: "Luftvideo",
    description: "Professionelle Drohnenvideos in höchster Qualität",
    features: [
      "Musik",
      "Film",
      "Baubranche",
      
    ],
    badge: "Beliebt"
  },
  {
    icon: FiImage,
    title: "Luftbilder",
    description: "Hochauflösende Fotos aus der Vogelperspektive",
    features: [
      "Immobilien",
      "Tourismus",
      "Architektur",
      "Infrastruktur"
    ]
  },
  {
    icon: FiFilm,
    title: "Videoproduktion",
    description: "Komplette Videoproduktionen für jeden Zweck",
    features: [
      "Imagefilme",
      "Werbespots",
      "Dokumentationen",
      "Eventfilme"
    ]
  },
  {
    icon: FiHome,
    title: "Video",
    description: "Perfekte Präsentation für Ihre Objekte",
    features: [
      "Innen & Außen",
      "360° Rundgänge",
      "Exposé-Material",
      "Verkaufsfördernd"
    ]
  },
  {
    icon: FiHeart,
    title: "Foto",
    description: "Unvergessliche Momente aus einzigartiger Perspektive",
    features: [
      "Luftaufnahmen",
      "Bodenaufnahmen",
      "Schnitt & Bearbeitung",
      "Highlight-Videos"
    ]
  },
  {
    icon: FiSearch,
    title: "Inspektion",
    description: "Technische Kontrollen aus der Luft",
    features: [
      "Dachinspektion",
      "Fassadenprüfung",
      "Thermografie",
      "Gutachten"
    ]
  }
];

const DroneIcon = ({ size = "40px", delay = 0 }) => (
  <MotionBox
    position="absolute"
    w={size}
    h={size}
    initial={{ opacity: 0, y: -50 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      y: [0, -20, 0]
    }}
    transition={{
      opacity: { duration: 3, repeat: Infinity, delay },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
    }}
  >
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path
        fill="currentColor"
        color="rgba(0,198,255,0.4)"
        d="M5,3V4H3V5H5.5L7,6.5V9H8.5L12,12.5L15.5,9H17V6.5L18.5,5H21V4H19V3H17.5L15.5,5H8.5L6.5,3H5M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M7,17A2,2 0 0,1 9,19A2,2 0 0,1 7,21A2,2 0 0,1 5,19A2,2 0 0,1 7,17M17,17A2,2 0 0,1 19,19A2,2 0 0,1 17,21A2,2 0 0,1 15,19A2,2 0 0,1 17,17Z"
      />
    </svg>
  </MotionBox>
);

const ServicesSection = () => {
  return (
    <Box
      width="100%"
      py={{ base: 12, md: 16 }}
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      {/* Background grid */}


      {/* Floating Drones */}
      <Box display={{ base: "none", md: "block" }}>
        <Box position="absolute" top="10%" right="15%">
          <DroneIcon size="30px" delay={0} />
        </Box>
        <Box position="absolute" top="25%" left="10%">
          <DroneIcon size="35px" delay={1} />
        </Box>
        <Box position="absolute" bottom="20%" right="20%">
          <DroneIcon size="40px" delay={2} />
        </Box>
      </Box>

      {/* Glow effect */}
      <MotionBox
        position="absolute"
        top="20%"
        left="50%"
        transform="translateX(-50%)"
        w={{ base: "300px", md: "500px" }}
        h={{ base: "300px", md: "500px" }}
        borderRadius="full"
        bg="radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)"
        filter="blur(100px)"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Container maxW="container.lg" px={{ base: 4, md: 6 }} position="relative" zIndex={2}>
        <VStack spacing={{ base: 8, md: 10 }}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
              Unsere Leistungen
            </Text>

            <Text
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={2}
            >
              Professionelle{" "}
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
              Produktionen
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              mx="auto"
            >
             Ob aus der der Luft oder am Boden
             Ihr Partner für außergewöhnliche Perspektiven 
            </Text>
          </MotionBox>

          {/* Desktop Grid */}
          <Box display={{ base: "none", md: "block" }} w="100%">
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              spacing={6} 
              w="100%"
            >
              {services.map((service, index) => (
                <MotionBox
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  h="100%"
                  w="100%"
                  display="flex"
                >
                  <ServiceCard {...service} />
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>

          {/* Mobile Slider */}
          <Box display={{ base: "block", md: "none" }} w="100%">
            <ServiceCardSlider services={services} />
          </Box>

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            w="100%"
            pt={{ base: 4, md: 6 }}
          >
            <ServiceCTA onContactClick={() => console.log('Contact clicked')} />
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesSection;