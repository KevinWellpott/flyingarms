'use client';

import React, { useState } from 'react';
import { Box, Container, VStack, Text, SimpleGrid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FiMessageCircle, 
  FiMap, 
  FiVideo, 
  FiEdit3, 
  FiSend,
  FiArrowRight
} from 'react-icons/fi';

// Imports nach deiner Struktur
import ProcessStepCard from '../../components/mainpage-components/ProcessSection/ProcessStepCard';
import ProcessProgressBar from '../../components/mainpage-components/ProcessSection/ProcessProgressBar';
import ProcessNavigation from '../../components/mainpage-components/ProcessSection/ProcessNavigation';

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
    description: "Detaillierte Vorbereitung Ihres Flugs",
    icon: FiMap,
    duration: "1-3 Tage",
    details: [
      "Flugplanung & Genehmigungen",
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
    duration: "2-6 Std",
    details: [
      "Sicherheits-Briefing",
      "Mehrere Takes & Perspektiven",
      "Live-Preview für Sie",
      "Backup-Sicherung"
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

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

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
      py={{ base: 0, md: 0 }}
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

      <Container 
        maxW="container.lg"
        px={{ base: 4, md: 6 }}
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={{ base: 2, md: 5 }}> {/* ← HIER! VON 3 AUF 2 REDUZIERT */}
          
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
              mb={{ base: 4, md: 8 }}
            >
              Unser Prozess
            </Text>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={{ base: 4, md: 6 }}
              fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
            >
              Von der Idee zur{" "}
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                Umsetzung
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              5 einfache Schritte zu professionellen Luftaufnahmen
            </Text>
          </MotionBox>

          {/* Progress Bar */}
          <ProcessProgressBar 
            activeStep={activeStep} 
            totalSteps={processSteps.length} 
          />

          {/* Desktop Grid */}
          <Box display={{ base: "none", lg: "block" }} w="100%">
            <SimpleGrid columns={5} gap={{ base: 4, md: 6 }} w="100%">
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

          {/* Mobile: Single Card */}
          <Box display={{ base: "block", lg: "none" }} w="100%">
            <Box position="relative" minH="450px" w="100%">
              {processSteps.map((step, index) => (
                <MotionBox
                  key={index}
                  position="absolute"
                  w="100%"
                  top="0"
                  left="0"
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
          </Box>

          {/* Navigation */}
          <ProcessNavigation
            activeStep={activeStep}
            totalSteps={processSteps.length}
            onNext={goNext}
            onPrev={goPrev}
          />

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            w="100%"
            maxW="700px"
            pt={{ base: 3, md: 6 }}
          >
            <Box
              p={{ base: 5, md: 6 }}
              bg="rgba(0,198,255,0.05)"
              backdropFilter="blur(30px)"
              borderRadius="2xl"
              border="1px solid rgba(0,198,255,0.2)"
              boxShadow="0 8px 32px rgba(0,198,255,0.15)"
            >
              <VStack spacing={3}>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  fontWeight="900"
                  color="white"
                  fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                >
                  Bereit für Ihr Projekt?
                </Text>

                <Button
                  w="100%"
                  h="56px"
                  bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                  color="white"
                  fontWeight="900"
                  fontSize="sm"
                  borderRadius="xl"
                  rightIcon={<Box as={FiArrowRight} />}
                  fontFamily="-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0,198,255,0.4)"
                  }}
                >
                  Jetzt Termin buchen
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProcessSection;