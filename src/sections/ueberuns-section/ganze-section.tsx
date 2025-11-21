'use client';

import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Avatar,
  Icon,
  Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCamera, FiMap, FiAward, FiUsers, FiTarget, FiShield } from 'react-icons/fi';
import { GiHelicopter } from 'react-icons/gi';
import Link from 'next/link';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const UeberUnsPage = () => {
  const teamMembers = [
    {
      name: "Max Müller",
      role: "CEO & Pilot",
      avatar: "/team/max.jpg",
      description: "15 Jahre Erfahrung in der Luftfahrt"
    },
    {
      name: "Sarah Schmidt",
      role: "Technical Director",
      avatar: "/team/sarah.jpg",
      description: "Expertin für Vermessungstechnik"
    },
    {
      name: "Tom Wagner",
      role: "Creative Director",
      avatar: "/team/tom.jpg",
      description: "Spezialist für Aerial Photography"
    }
  ];

  const values = [
    {
      icon: FiCamera,
      title: "Präzision",
      description: "Höchste Qualität in jeder Aufnahme durch modernste Technologie"
    },
    {
      icon: FiShield,
      title: "Sicherheit",
      description: "Alle Flüge nach höchsten Sicherheitsstandards und Vorschriften"
    },
    {
      icon: FiTarget,
      title: "Zuverlässigkeit",
      description: "Termintreue und professionelle Abwicklung bei jedem Projekt"
    }
  ];

  return (
    <Box minH="100vh" bg="#000" color="white" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
        <VStack spacing={{ base: 16, md: 20 }} align="stretch">
          
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <HStack justify="center" spacing={4} mb={4}>
                <Icon 
                  as={GiHelicopter} 
                  color="cyan.400" 
                  w="48px" 
                  h="48px"
                  filter="drop-shadow(0 0 20px rgba(0,198,255,0.6))"
                />
              </HStack>
              <Text
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                bgGradient="linear(to-br, cyan.300, cyan.500)"
                bgClip="text"
                lineHeight="1.2"
                mb={6}
              >
                Über Flying-Arms
              </Text>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color="rgba(255,255,255,0.8)"
                fontWeight="400"
                lineHeight="1.6"
              >
                Die schärfste Sicht von oben – Professionelle Drohnenservices für 
                Unternehmen, die das Beste erwarten.
              </Text>
            </MotionBox>
          </VStack>

          {/* Story Section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            bg="rgba(0,0,0,0.4)"
            backdropFilter="blur(30px)"
            borderRadius="2xl"
            border="1px solid rgba(0,198,255,0.3)"
            p={{ base: 8, md: 12 }}
            boxShadow="0 20px 60px rgba(0,198,255,0.15), inset 0 0 40px rgba(0,198,255,0.05)"
            position="relative"
            overflow="hidden"
          >
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="2px"
              bgGradient="linear(to-r, transparent, cyan.400, transparent)"
              opacity={0.5}
            />

            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 8, md: 12 }}>
              <GridItem>
                <VStack align="start" spacing={6}>
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="700"
                    color="cyan.300"
                  >
                    Unsere Geschichte
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="rgba(255,255,255,0.9)"
                    lineHeight="1.8"
                  >
                    Seit 2019 revolutionieren wir die Art, wie Unternehmen die Welt von oben betrachten. 
                    Was als Leidenschaft für Luftfahrt begann, ist heute ein führendes Unternehmen für 
                    professionelle Drohnenservices.
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="rgba(255,255,255,0.7)"
                    lineHeight="1.7"
                  >
                    Mit über 500 erfolgreich abgeschlossenen Projekten und einem Team aus zertifizierten 
                    Piloten und Technikexperten setzen wir neue Maßstäbe in der Branche.
                  </Text>
                </VStack>
              </GridItem>
              
              <GridItem>
                <VStack align="start" spacing={6}>
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="700"
                    color="cyan.300"
                  >
                    Unsere Mission
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="rgba(255,255,255,0.9)"
                    lineHeight="1.8"
                  >
                    Wir erschließen neue Perspektiven für Unternehmen durch innovative Drohnentechnologie. 
                    Präzise Vermessungen, atemberaubende Aufnahmen und maßgeschneiderte Lösungen – 
                    das ist unser Versprechen.
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="rgba(255,255,255,0.7)"
                    lineHeight="1.7"
                  >
                    Jeden Tag arbeiten wir daran, die Grenzen des Möglichen zu erweitern und unseren 
                    Kunden einen entscheidenden Wettbewerbsvorteil zu verschaffen.
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </MotionBox>

          {/* Values Section */}
          <VStack spacing={12} align="stretch">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="800"
              textAlign="center"
              bgGradient="linear(to-br, cyan.300, cyan.500)"
              bgClip="text"
            >
              Unsere Werte
            </Text>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              {values.map((value, index) => (
                <MotionBox
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  bg="rgba(0,0,0,0.4)"
                  backdropFilter="blur(30px)"
                  borderRadius="xl"
                  border="1px solid rgba(0,198,255,0.2)"
                  p={8}
                  boxShadow="0 10px 40px rgba(0,198,255,0.1)"
                  textAlign="center"
                  _hover={{
                    borderColor: "rgba(0,198,255,0.4)",
                    boxShadow: "0 15px 50px rgba(0,198,255,0.2)",
                    transform: "translateY(-5px)"
                  }}
                  transition="all 0.3s ease"
                >
                  <VStack spacing={4}>
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg="rgba(0,198,255,0.1)"
                      border="1px solid rgba(0,198,255,0.3)"
                    >
                      <Icon as={value.icon} w="32px" h="32px" color="cyan.400" />
                    </Box>
                    <Text
                      fontSize="xl"
                      fontWeight="700"
                      color="cyan.300"
                    >
                      {value.title}
                    </Text>
                    <Text
                      color="rgba(255,255,255,0.8)"
                      lineHeight="1.6"
                    >
                      {value.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </VStack>

          {/* Team Section */}
          <VStack spacing={12} align="stretch">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="800"
              textAlign="center"
              bgGradient="linear(to-br, cyan.300, cyan.500)"
              bgClip="text"
            >
              Unser Team
            </Text>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              {teamMembers.map((member, index) => (
                <MotionBox
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  bg="rgba(0,0,0,0.4)"
                  backdropFilter="blur(30px)"
                  borderRadius="xl"
                  border="1px solid rgba(0,198,255,0.2)"
                  p={8}
                  boxShadow="0 10px 40px rgba(0,198,255,0.1)"
                  textAlign="center"
                  _hover={{
                    borderColor: "rgba(0,198,255,0.4)",
                    boxShadow: "0 15px 50px rgba(0,198,255,0.2)",
                    transform: "translateY(-5px)"
                  }}
                  transition="all 0.3s ease"
                >
                  <VStack spacing={4}>
                    <Avatar
                      size="xl"
                      name={member.name}
                      src={member.avatar}
                      bg="rgba(0,198,255,0.2)"
                      border="2px solid rgba(0,198,255,0.4)"
                      boxShadow="0 8px 32px rgba(0,198,255,0.3)"
                    />
                    <VStack spacing={1}>
                      <Text
                        fontSize="xl"
                        fontWeight="700"
                        color="white"
                      >
                        {member.name}
                      </Text>
                      <Text
                        fontSize="md"
                        color="cyan.300"
                        fontWeight="600"
                      >
                        {member.role}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="rgba(255,255,255,0.7)"
                        textAlign="center"
                      >
                        {member.description}
                      </Text>
                    </VStack>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </VStack>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            bg="rgba(0,0,0,0.4)"
            backdropFilter="blur(30px)"
            borderRadius="2xl"
            border="1px solid rgba(0,198,255,0.3)"
            p={{ base: 8, md: 12 }}
            boxShadow="0 20px 60px rgba(0,198,255,0.15), inset 0 0 40px rgba(0,198,255,0.05)"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="2px"
              bgGradient="linear(to-r, transparent, cyan.400, transparent)"
              opacity={0.5}
            />

            <VStack spacing={6}>
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color="cyan.300"
              >
                Bereit für ein Projekt?
              </Text>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="rgba(255,255,255,0.8)"
                maxW="600px"
                lineHeight="1.7"
              >
                Lass uns gemeinsam dein nächstes Projekt verwirklichen. 
                Von der ersten Idee bis zur finalen Umsetzung – wir sind dein Partner für professionelle Drohnenservices.
              </Text>
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Link href="/kontakt">
                  <Button
                    bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                    color="white"
                    size="lg"
                    px={8}
                    h="56px"
                    borderRadius="xl"
                    fontWeight="900"
                    fontSize="md"
                    boxShadow="0 8px 32px rgba(0,198,255,0.4)"
                    _hover={{
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 40px rgba(0,198,255,0.5)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Projekt starten
                  </Button>
                </Link>
                <Link href="/referenzen">
                  <Button
                    variant="outline"
                    borderColor="rgba(0,198,255,0.5)"
                    color="cyan.300"
                    size="lg"
                    px={8}
                    h="56px"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="md"
                    _hover={{
                      bg: "rgba(0,198,255,0.1)",
                      borderColor: "cyan.400",
                      transform: "translateY(-3px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Referenzen ansehen
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </MotionBox>

        </VStack>
      </Container>
    </Box>
  );
};

export default UeberUnsPage;