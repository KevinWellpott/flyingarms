// components/CookiePreferences.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Switch,
  Button,
  Box,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShield, FiBarChart, FiTarget, FiSettings, FiCheck, FiInfo } from 'react-icons/fi';
import { useCookies } from '../contexts/CookieContext';
import { COOKIE_CATEGORIES, CookiePreferences } from '../types/cookie';

const MotionBox = motion(Box);

const CookiePreferencesModal: React.FC = () => {
  const { 
    showPreferences, 
    closePreferences, 
    acceptSelected, 
    consentData 
  } = useCookies();

  const [preferences, setPreferences] = useState<CookiePreferences>(
    consentData.preferences
  );

  // Update local state when consent data changes
  useEffect(() => {
    setPreferences(consentData.preferences);
  }, [consentData.preferences]);

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Can't toggle necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    acceptSelected(preferences);
  };

  const categoryIcons = {
    necessary: FiShield,
    analytics: FiBarChart,
    marketing: FiTarget,
    functional: FiSettings,
  };

  const categoryColors = {
    necessary: 'green',
    analytics: 'cyan',
    marketing: 'purple',
    functional: 'orange',
  };

  return (
    <Modal 
      isOpen={showPreferences} 
      onClose={closePreferences} 
      size={{ base: "full", md: "2xl" }}
      scrollBehavior="inside"
    >
      <ModalOverlay 
        bg="rgba(0,0,0,0.8)" 
        backdropFilter="blur(10px)" 
      />
      <ModalContent
        bg="rgba(0,0,0,0.95)"
        backdropFilter="blur(30px)"
        border="1px solid rgba(0,198,255,0.3)"
        borderRadius={{ base: "none", md: "2xl" }}
        boxShadow="0 20px 60px rgba(0,198,255,0.2)"
        color="white"
        maxH={{ base: "100vh", md: "90vh" }}
      >
        <ModalHeader
          borderBottom="1px solid rgba(0,198,255,0.2)"
          pb={4}
          pt={6}
        >
          <HStack spacing={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="rgba(0,198,255,0.1)"
              border="1px solid rgba(0,198,255,0.3)"
            >
              <FiShield size={20} color="#00C6FF" />
            </Box>
            <VStack align="start" spacing={1}>
              <Text fontSize="xl" fontWeight="700" color="cyan.300">
                Cookie-Einstellungen
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700">
                Verwalten Sie Ihre Cookie-Präferenzen
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>

        <ModalCloseButton 
          color="whiteAlpha.700" 
          _hover={{ color: "white", bg: "rgba(255,255,255,0.1)" }}
          borderRadius="lg"
        />

        <ModalBody py={6}>
          <VStack spacing={6} align="stretch">
            
            {/* Info Text */}
            <Box
              p={4}
              bg="rgba(0,198,255,0.05)"
              borderRadius="xl"
              border="1px solid rgba(0,198,255,0.2)"
            >
              <HStack spacing={3} mb={3}>
                <FiInfo size={16} color="#00C6FF" />
                <Text fontSize="sm" fontWeight="600" color="cyan.300">
                  Über Cookies
                </Text>
              </HStack>
              <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.6">
                Cookies sind kleine Textdateien, die von Websites verwendet werden, um die Benutzererfahrung zu verbessern. 
                Diese Website verwendet verschiedene Arten von Cookies für unterschiedliche Zwecke.
              </Text>
            </Box>

            {/* Cookie Categories */}
            <VStack spacing={4} align="stretch">
              {Object.entries(COOKIE_CATEGORIES).map(([key, category]) => {
                const Icon = categoryIcons[key as keyof typeof categoryIcons];
                const isEnabled = preferences[key as keyof CookiePreferences];
                const isRequired = category.required;
                const colorScheme = categoryColors[key as keyof typeof categoryColors];

                return (
                  <MotionBox
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    bg="rgba(255,255,255,0.02)"
                    borderRadius="xl"
                    border="1px solid rgba(255,255,255,0.1)"
                    p={5}
                    _hover={{
                      bg: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(0,198,255,0.2)"
                    }}
                    
                  >
                    <HStack justify="space-between" align="start" mb={4}>
                      <HStack spacing={4} flex="1">
                        <Box
                          p={3}
                          borderRadius="lg"
                          bg={`rgba(${colorScheme === 'cyan' ? '0,198,255' : 
                                colorScheme === 'green' ? '0,255,100' :
                                colorScheme === 'purple' ? '128,0,255' : 
                                '255,165,0'},0.1)`}
                          border={`1px solid rgba(${colorScheme === 'cyan' ? '0,198,255' : 
                                    colorScheme === 'green' ? '0,255,100' :
                                    colorScheme === 'purple' ? '128,0,255' : 
                                    '255,165,0'},0.3)`}
                        >
                          <Icon size={20} color={
                            colorScheme === 'cyan' ? '#00C6FF' : 
                            colorScheme === 'green' ? '#00FF64' :
                            colorScheme === 'purple' ? '#8000FF' : 
                            '#FFA500'
                          } />
                        </Box>

                        <VStack align="start" spacing={2} flex="1">
                          <HStack spacing={3}>
                            <Text fontSize="md" fontWeight="600" color="white">
                              {category.title}
                            </Text>
                            {isRequired && (
                              <Badge
                                size="sm"
                                colorScheme="green"
                                borderRadius="md"
                                px={2}
                                py={1}
                              >
                                Erforderlich
                              </Badge>
                            )}
                          </HStack>
                          <Text fontSize="sm" color="whiteAlpha.700" lineHeight="1.5">
                            {category.description}
                          </Text>
                        </VStack>
                      </HStack>

                      <Switch
                        isChecked={isEnabled}
                        onChange={() => handleToggle(key as keyof CookiePreferences)}
                        isDisabled={isRequired}
                        colorScheme="cyan"
                        size="lg"
                      />
                    </HStack>

                    {/* Examples Accordion */}
                    <Accordion allowToggle>
                      <AccordionItem border="none">
                        <AccordionButton
                          px={0}
                          py={2}
                          _hover={{ bg: "transparent" }}
                          _focus={{ boxShadow: "none" }}
                        >
                          <Text fontSize="xs" color="cyan.400" flex="1" textAlign="left">
                            Beispiele anzeigen
                          </Text>
                          <AccordionIcon color="cyan.400" />
                        </AccordionButton>
                        <AccordionPanel px={0} pb={0}>
                          <Box
                            mt={2}
                            p={3}
                            bg="rgba(0,0,0,0.3)"
                            borderRadius="lg"
                            border="1px solid rgba(255,255,255,0.05)"
                          >
                            <List spacing={1}>
                              {category.examples.map((example, index) => (
                                <ListItem key={index} fontSize="xs" color="whiteAlpha.600">
                                  <ListIcon as={FiCheck} color="cyan.400" />
                                  {example}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </MotionBox>
                );
              })}
            </VStack>

            {/* Legal Notice */}
            <Box
              p={4}
              bg="rgba(255,255,255,0.02)"
              borderRadius="lg"
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Text fontSize="xs" color="whiteAlpha.600" lineHeight="1.5">
                Ihre Einwilligung ist freiwillig und kann jederzeit widerrufen werden. 
                Weitere Informationen finden Sie in unserer{' '}
                <Text as="span" color="cyan.400" textDecoration="underline" cursor="pointer">
                  Datenschutzerklärung
                </Text>
                . Die Einwilligung wird für 12 Monate gespeichert.
              </Text>
            </Box>

          </VStack>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid rgba(0,198,255,0.2)"
          pt={4}
        >
          <HStack spacing={3} w="100%">
            <Button
              variant="ghost"
              onClick={closePreferences}
              color="whiteAlpha.700"
              _hover={{ bg: "rgba(255,255,255,0.05)", color: "white" }}
            >
              Abbrechen
            </Button>
            <Button
              onClick={handleSave}
              bg="linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)"
              color="white"
              fontWeight="600"
              borderRadius="lg"
              px={8}
              boxShadow="0 4px 16px rgba(0,198,255,0.3)"
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px rgba(0,198,255,0.4)"
              }}
              transition="all 0.2s ease"
            >
              Einstellungen speichern
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CookiePreferencesModal;