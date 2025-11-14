'use client'

import { Box, Container, VStack, Heading, Text, Button } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Box
      pt="120px"
      minH="100vh"
      bgGradient="linear(135deg, #0f172a 0%, #1e293b 25%, #334155 50%)"
      display="flex"
      alignItems="center"
    >
      <Container maxW="8xl">
        <VStack spacing={8} align="center" textAlign="center">
          <Heading
            size="4xl"
            color="white"
            textShadow="0 0 30px rgba(255,255,255,0.3)"
          >
            Willkommen bei{' '}
            <Text as="span" color="brand.400">
              Flying-Arms
            </Text>
          </Heading>
          
          <Text
            fontSize="xl"
            color="gray.300"
            maxW="600px"
          >
            Professionelle Drohnenservices für Produktaufnahmen, 
            Vermessungen und Schulungen. Die schärfste Sicht von oben.
          </Text>

          <VStack spacing={4}>
            <Button
              variant="gradient"
              size="xl"
              px={12}
              py={8}
              fontSize="lg"
              borderRadius="full"
            >
              Jetzt Projekt starten
            </Button>
            
            <Text fontSize="sm" color="gray.400">
              Kostenlose Beratung & unverbindliches Angebot
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}