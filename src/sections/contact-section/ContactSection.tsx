// sections/contact-sections/ContactSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  useToast
} from '@chakra-ui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const SERVICES = [
  { value: 'Luftvideo', description: 'Professionelle Drohnenvideos' },
  { value: 'Luftbilder', description: 'Hochauflösende Fotos aus der Vogelperspektive' },
  { value: 'Videoproduktion', description: 'Komplette Videoproduktionen für jeden Zweck' },
  { value: 'Video', description: 'Professionelles Videomaterial' },
  { value: 'Foto', description: 'Momente aus einzigartiger Perspektive' },
  { value: 'Videoschnitt', description: 'Schnitt & Color Grading' },
  { value: 'Inspektion/Vermessung', description: 'Technische Kontrollen aus der Luft' },
  { value: 'Sonstiges', description: 'Individuelle Anfrage oder Beratung' },
];

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: 'Fehler',
        description: 'Bitte füllen Sie alle Pflichtfelder aus.',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        toast({
          title: 'Erfolgreich gesendet!',
          description: 'Wir melden uns in Kürze bei Ihnen.',
          status: 'success',
          duration: 5000,
        });
        
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        throw new Error(result.error || 'Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      toast({
        title: 'Fehler beim Senden',
        description: error instanceof Error ? error.message : 'Bitte versuchen Sie es erneut.',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" py={{ base: 20, md: 32 }} bg="transparent" minH="100vh">
      <Container maxW="1100px" px={{ base: 4, md: 6 }}>
        <VStack spacing={12}>
          
          {/* Header */}
          <VStack spacing={6} textAlign="center">
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="4px"
              textTransform="uppercase"
              bgGradient="linear(to-r, cyan.300, cyan.500)"
              bgClip="text"
            >
              KONTAKT
            </Text>
            <Text
              as="h1"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                Lassen Sie uns sprechen
              </Text>
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              lineHeight="1.7"
            >
              Bereit für professionelle Drohnenaufnahmen? Kontaktieren Sie uns für eine kostenlose Beratung.
            </Text>
          </VStack>

          {/* Form */}
          <Box
            w="100%"
            maxW="600px"
            mx="auto"
            bg="rgba(0,0,0,0.4)"
            backdropFilter="blur(20px)"
            borderRadius="2xl"
            border="1px solid rgba(0,198,255,0.2)"
            p={{ base: 8, md: 10 }}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                
                {/* Name */}
                <FormControl isRequired>
                  <FormLabel color="white" fontSize="sm" fontWeight="600">Name *</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ihr vollständiger Name"
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(0,198,255,0.3)"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "cyan.400" }}
                  />
                </FormControl>

                {/* Email */}
                <FormControl isRequired>
                  <FormLabel color="white" fontSize="sm" fontWeight="600">Email *</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ihre.email@beispiel.de"
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(0,198,255,0.3)"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "cyan.400" }}
                  />
                </FormControl>

                {/* Phone */}
                <FormControl>
                  <FormLabel color="white" fontSize="sm" fontWeight="600">Telefon (optional)</FormLabel>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+49 123 456789"
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(0,198,255,0.3)"
                    color="white"
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "cyan.400" }}
                  />
                </FormControl>

                {/* Service */}
                <FormControl isRequired>
                  <FormLabel color="white" fontSize="sm" fontWeight="600">Gewünschte Leistung *</FormLabel>
                  <Menu matchWidth gutter={6}>
                    <MenuButton
                      as={Button}
                      type="button"
                      w="100%"
                      h="40px"
                      px={4}
                      textAlign="left"
                      fontWeight="400"
                      fontSize="md"
                      bg="rgba(0,0,0,0.3)"
                      border="1px solid rgba(0,198,255,0.3)"
                      borderRadius="md"
                      color={formData.service ? "white" : "whiteAlpha.500"}
                      rightIcon={<Box as={FiChevronDown} color="cyan.300" />}
                      _hover={{ borderColor: "rgba(0,198,255,0.5)" }}
                      _active={{ bg: "rgba(0,0,0,0.3)", borderColor: "cyan.400" }}
                      _expanded={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px var(--chakra-colors-cyan-400)" }}
                      _focusVisible={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px var(--chakra-colors-cyan-400)" }}
                    >
                      {formData.service || 'Wählen Sie eine Leistung'}
                    </MenuButton>
                    <MenuList
                      bg="rgba(8,12,16,0.96)"
                      backdropFilter="blur(20px)"
                      border="1px solid rgba(0,198,255,0.3)"
                      borderRadius="xl"
                      boxShadow="0 12px 40px rgba(0,0,0,0.6), 0 0 24px rgba(0,198,255,0.12)"
                      py={2}
                      maxH="320px"
                      overflowY="auto"
                      zIndex={20}
                    >
                      {SERVICES.map(({ value, description }) => {
                        const isSelected = formData.service === value;
                        return (
                          <MenuItem
                            key={value}
                            onClick={() => setFormData(prev => ({ ...prev, service: value }))}
                            bg="transparent"
                            color="white"
                            px={4}
                            py={2.5}
                            _hover={{ bg: "rgba(0,198,255,0.1)" }}
                            _focus={{ bg: "rgba(0,198,255,0.1)" }}
                          >
                            <HStack w="100%" justify="space-between" spacing={3}>
                              <Box>
                                <Text fontSize="sm" fontWeight="600" color={isSelected ? "cyan.300" : "white"}>
                                  {value}
                                </Text>
                                <Text fontSize="xs" color="whiteAlpha.500">
                                  {description}
                                </Text>
                              </Box>
                              {isSelected && <Box as={FiCheck} color="cyan.300" flexShrink={0} />}
                            </HStack>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                </FormControl>

                {/* Message */}
                <FormControl isRequired>
                  <FormLabel color="white" fontSize="sm" fontWeight="600">Ihre Nachricht *</FormLabel>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Beschreiben Sie Ihr Projekt..."
                    bg="rgba(0,0,0,0.3)"
                    border="1px solid rgba(0,198,255,0.3)"
                    color="white"
                    rows={5}
                    _placeholder={{ color: "whiteAlpha.500" }}
                    _focus={{ borderColor: "cyan.400" }}
                  />
                </FormControl>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  w="100%"
                  bgGradient="linear(to-r, cyan.400, cyan.600)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, cyan.500, cyan.700)",
                    transform: "translateY(-2px)"
                  }}
                  isLoading={isLoading}
                  loadingText="Wird gesendet..."
                >
                  Nachricht senden
                </Button>

              </VStack>
            </form>
          </Box>

        </VStack>
      </Container>
    </Box>
  );
};

export default ContactSection;