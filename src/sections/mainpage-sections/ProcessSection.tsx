'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, VStack, HStack, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiMessageCircle, 
  FiMap, 
  FiVideo, 
  FiEdit3, 
  FiSend,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiNavigation,
  FiNavigation2
} from 'react-icons/fi';
import Link from 'next/link';

const MotionBox = motion(Box);

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: any;
  duration: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Erstgespräch",
    description: "Kostenlose Beratung zu Ihrem Projekt",
    icon: FiMessageCircle,
    duration: "15-30 Min",
    details: [
      "Bedarfsanalyse & Zielsetzung",
      "Technische Machbarkeit prüfen",
      "Genehmigungen besprechen",
      "Unverbindliches Angebot"
    ]
  },
  {
    number: 2,
    title: "Planung",
    description: "Detaillierte Vorbereitung Ihres Projektes",
    icon: FiMap,
    duration: "1-3 Tage",
    details: [
      "Planung",
      "Wetterbedingungen analysieren",
      "Equipment-Check",
      "Shot-List erstellen"
    ]
  },
  {
    number: 3,
    title: "Produktion",
    description: "Professionelle Aufnahmen vor Ort",
    icon: FiVideo,
    duration: "4-8 Std",
    details: [
      "Lieferung",
      "Finales Material",
      "Rohmaterial ( Optional )",
     
    ]
  },
  {
    number: 4,
    title: "Post-Production",
    description: "Schnitt, Color Grading & Veredelung",
    icon: FiEdit3,
    duration: "2-5 Tage",
    details: [
      "Professioneller Schnitt",
      "Color Grading",
      "Sound Design (optional)",
      "Erste Korrekturschleife"
    ]
  },
  {
    number: 5,
    title: "Lieferung",
    description: "Finales Material in allen Formaten",
    icon: FiSend,
    duration: "24 Std",
    details: [
      "Download-Link erhalten",
      "Alle vereinbarten Formate",
      "Rohmaterial inklusive",
      "Nutzungsrechte übertragen"
    ]
  }
];

// ProcessStepCard Component (inline)
const ProcessStepCard: React.FC<{ 
  step: ProcessStep; 
  index: number; 
  isActive: boolean; 
  isCompleted: boolean; 
}> = ({ step, index, isActive, isCompleted }) => {
  const Icon = step.icon;

  return (
    <VStack spacing={{ base: 2, md: 3 }} align="stretch" w="100%">
      <MotionBox
        w="80px"
        h="80px"
        mx="auto"
        borderRadius="xl"
        bg={isActive ? "rgba(0,198,255,0.15)" : "rgba(255,255,255,0.03)"}
        border="1px solid"
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
            borderRadius="full"
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
            borderRadius="full"
            bg={isActive ? "cyan.400" : "rgba(255,255,255,0.2)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
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
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        />
      </MotionBox>

      <VStack spacing={1} textAlign="center">
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="900"
          color={isActive ? "cyan.300" : "white"}
          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
        >
          {step.title}
        </Text>
        
        <HStack spacing={1.5} justify="center" color="whiteAlpha.500">
          <Box as={FiClock} size="12px" />
          <Text fontSize="xs" fontWeight="600">
            {step.duration}
          </Text>
        </HStack>

        <Text 
          fontSize={{ base: "xs", md: "sm" }}
          color="whiteAlpha.700" 
          lineHeight="1.6"
        >
          {step.description}
        </Text>
      </VStack>

      {isActive && (
        <VStack
          spacing={1}
          align="stretch"
          p={{ base: 3, md: 4 }}
          bg="rgba(0,198,255,0.05)"
          borderRadius="md"
          border="1px solid rgba(0,198,255,0.2)"
          mt={2}
        >
          {step.details.map((detail, i) => (
            <HStack key={i} spacing={2} align="flex-start">
              <Box
                minW="4px"
                h="4px"
                mt={1.5}
                borderRadius="full"
                bg="cyan.400"
              />
              <Text 
                fontSize="xs"
                color="whiteAlpha.800" 
                lineHeight="1.5"
              >
                {detail}
              </Text>
            </HStack>
          ))}
          {step.number === 5 && (
            <VStack spacing={3} align="stretch" pt={3} mt={2} borderTop="1px solid rgba(0,198,255,0.2)">
              <Text
                fontSize="sm"
                fontWeight="700"
                color="cyan.300"
                textAlign="center"
              >
                Bereit für Ihr Projekt?
              </Text>
              <Link href="/kontakt" style={{ width: '100%' }}>
                <Button
                  w="100%"
                  h="44px"
                  bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                  color="white"
                  fontWeight="900"
                  fontSize="sm"
                  borderRadius="lg"
                  rightIcon={<Box as={FiArrowRight} />}
                  fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                  boxShadow="0 4px 16px rgba(0,198,255,0.3)"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 24px rgba(0,198,255,0.4)"
                  }}
                  _active={{
                    transform: "translateY(0)"
                  }}
                >
                  Jetzt Termin buchen
                </Button>
              </Link>
            </VStack>
          )}
        </VStack>
      )}
    </VStack>
  );
};

// ProcessProgressBar Component (inline)
const ProcessProgressBar: React.FC<{
  activeStep: number;
  totalSteps: number;
}> = ({ activeStep, totalSteps }) => {
  const progress = ((activeStep + 1) / totalSteps) * 100;

  return (
    <VStack spacing={2} w="100%" maxW="600px">
      <HStack justify="space-between" w="100%">
        <Text 
          fontSize="sm"
          fontWeight="700" 
          color="cyan.400"
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
        >
          SCHRITT {activeStep + 1} VON {totalSteps}
        </Text>
        <Text 
          fontSize="sm"
          fontWeight="600" 
          color="whiteAlpha.500"
        >
          {Math.round(progress)}%
        </Text>
      </HStack>

      <Box 
        w="100%" 
        h="8px" 
        bg="rgba(255,255,255,0.1)" 
        borderRadius="full"
        overflow="hidden"
        position="relative"
      >
        <MotionBox
          h="100%"
          bg="cyan.600"
          borderRadius="full"
          boxShadow="0 0 30px rgba(0,198,255,0.8), 0 0 60px rgba(0,198,255,0.4)"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          position="relative"
        >
          {/* Glowing effect */}
          <Box
            position="absolute"
            top="0"
            right="0"
            w="20px"
            h="100%"
            bg="linear-gradient(to-r, transparent, rgba(255,255,255,0.6))"
            borderRadius="full"
            filter="blur(4px)"
          />
        </MotionBox>
      </Box>
    </VStack>
  );
};

// ProcessNavigation Component (inline)
const ProcessNavigation: React.FC<{
  activeStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}> = ({ activeStep, totalSteps, onNext, onPrev }) => {
  return (
    <Box w="100%" maxW="600px" mx="auto">
      <HStack spacing={3} w="100%" justify="center">
        <Button
          onClick={onPrev}
          isDisabled={activeStep === 0}
          size="lg"
          h="48px"
          w="50%"
          bg={activeStep === 0 ? "rgba(255,255,255,0.05)" : "rgba(6, 191, 241, 0.1)"}
          color={activeStep === 0 ? "whiteAlpha.400" : "cyan.300"}
          border="1px solid"
          borderColor={activeStep === 0 ? "rgba(255,255,255,0.1)" : "rgba(0,198,255,0.3)"}
          borderRadius="xl"
          fontWeight="900"
          fontSize="sm"
          leftIcon={<Box as={FiArrowLeft} />}
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
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
          h="48px"
          w="50%"
          bg={activeStep === totalSteps - 1 ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"}
          color="white"
          borderRadius="xl"
          fontWeight="900"
          fontSize="sm"
          boxShadow={activeStep !== totalSteps - 1 ? "0 4px 24px rgba(0,198,255,0.4)" : "none"}
          rightIcon={<Box as={FiArrowRight} />}
          fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
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

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = () => {
    if (activeStep < processSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const goPrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Box
      width="100%"
      py={{ base: 12, md: 16 }}
      pb={{ base: 20, md: 24 }}
      position="relative"
      overflow="hidden"
      bg="transparent"
    >
      {/* Background Effects */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.02"
        backgroundImage="linear-gradient(rgba(0,198,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,0.3) 1px, transparent 1px)"
        backgroundSize="50px 50px"
        pointerEvents="none"
      />

      {/* ANIMIERTE DROHNEN - FIXED KEYFRAMES */}
      {/* Drohne 1 - Nur X Animation */}
      <MotionBox
        position="absolute"
        top="15%"
        left={0}
        zIndex={10}
        animate={{ 
          x: [0, windowWidth > 0 ? windowWidth + 100 : 1500],
          rotate: [0, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Box 
          as={FiNavigation} 
          w="32px" 
          h="32px" 
          color="cyan.400"
          filter="drop-shadow(0 0 20px rgba(0,198,255,0.6))"
        />
      </MotionBox>

      {/* Drohne 2 - Von rechts nach links */}
      <MotionBox
        position="absolute"
        top="45%"
        right={0}
        zIndex={10}
        animate={{ 
          x: [0, -(windowWidth > 0 ? windowWidth + 100 : 1500)],
          rotate: [0, -360]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
      >
        <Box 
          as={FiNavigation2} 
          w="28px" 
          h="28px" 
          color="cyan.300"
          filter="drop-shadow(0 0 15px rgba(0,198,255,0.4))"
          opacity={0.8}
        />
      </MotionBox>

      {/* Drohne 3 - Mit Y Animation aber nur Numbers */}
      <MotionBox
        position="absolute"
        top="70%"
        left={0}
        zIndex={10}
        animate={{ 
          x: [0, windowWidth > 0 ? windowWidth + 100 : 1500],
          y: [0, -40, 20, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
      >
        <Box 
          as={FiSend} 
          w="24px" 
          h="24px" 
          color="cyan.500"
          filter="drop-shadow(0 0 12px rgba(0,198,255,0.3))"
          opacity={0.6}
        />
      </MotionBox>

      {/* Drohne 4 - Diagonal aber nur Numbers */}
      <MotionBox
        position="absolute"
        top="25%"
        right="-50px"
        zIndex={10}
        animate={{ 
          x: [0, -(windowWidth > 0 ? windowWidth + 150 : 1650)],
          y: [0, 400],
          rotate: [0, -180, -360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 12
        }}
      >
        <Box 
          as={FiArrowRight} 
          w="26px" 
          h="26px" 
          color="cyan.600"
          filter="drop-shadow(0 0 8px rgba(0,198,255,0.2))"
          opacity={0.4}
        />
      </MotionBox>

      <Container 
        maxW="container.xl"
        px={{ base: 4, md: 8 }}
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={{ base: 6, md: 8 }}>
          
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
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={{ base: 4, md: 6 }}
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
            >
              Professionelle{" "}
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                Produktion
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "lg" }}
              color="whiteAlpha.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
             5 einfache Schritte zur Realisierung Ihres Projektes
            </Text>
          </MotionBox>

          {/* Progress Bar */}
          <ProcessProgressBar 
            activeStep={activeStep} 
            totalSteps={processSteps.length} 
          />

          {/* Desktop Grid */}
          <Box display={{ base: "none", lg: "block" }} w="100%">
            <SimpleGrid columns={5} spacing={{ base: 6, md: 8 }} w="100%">
              {processSteps.map((step, index) => (
                <Box
                  key={index}
                  onClick={() => setActiveStep(index)}
                  cursor="pointer"
                  opacity={index === activeStep ? 1 : 0.6}
                  _hover={{ opacity: 1 }}
                  transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                >
                  <ProcessStepCard
                    step={step}
                    index={index}
                    isActive={index === activeStep}
                    isCompleted={index < activeStep}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Mobile: Single Card with Navigation */}
          <Box display={{ base: "block", lg: "none" }} w="100%" px={4}>
            <VStack spacing={4} align="stretch">
              <Box position="relative" w="100%" minH="0">
                {processSteps.map((step, index) => (
                  <MotionBox
                    key={index}
                    position={index === activeStep ? "relative" : "absolute"}
                    w="100%"
                    top={index === activeStep ? "auto" : "0"}
                    left={index === activeStep ? "auto" : "0"}
                    animate={{
                      opacity: index === activeStep ? 1 : 0,
                      pointerEvents: index === activeStep ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProcessStepCard
                      step={step}
                      index={index}
                      isActive={index === activeStep}
                      isCompleted={index < activeStep}
                    />
                  </MotionBox>
                ))}
              </Box>

              {/* Navigation - Only show when not on last step */}
              {activeStep < processSteps.length - 1 && (
                <Box w="100%" pt={2} display="flex" justifyContent="center">
                  <ProcessNavigation
                    activeStep={activeStep}
                    totalSteps={processSteps.length}
                    onNext={goNext}
                    onPrev={goPrev}
                  />
                </Box>
              )}
            </VStack>
          </Box>

          {/* Desktop Navigation - Only show when not on last step */}
          {activeStep < processSteps.length - 1 && (
            <Box display={{ base: "none", lg: "flex" }} w="100%" pt={2} justifyContent="center">
              <ProcessNavigation
                activeStep={activeStep}
                totalSteps={processSteps.length}
                onNext={goNext}
                onPrev={goPrev}
              />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ProcessSection;