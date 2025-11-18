// sections/aufnahmen-sections/DynamicGallery.tsx
'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  SimpleGrid, 
  VStack, 
  HStack,
  Image,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageSection, GalleryImage } from '../../types/page';

const MotionBox = motion(Box);

interface DynamicGalleryProps {
  data?: PageSection;
}

const DynamicGallery: React.FC<DynamicGalleryProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // ✅ Simple number

  if (!data) return null;

  const {
    gallery_section_title = 'Unsere Projekte',
    gallery_section_subtitle = 'Eindrücke aus der Luft', 
    gallery_section_description = 'Entdecken Sie unsere besten Luftaufnahmen',
    gallery_images = []
  } = data;

  const sortedImages = Array.isArray(gallery_images) ? 
    [...gallery_images].sort((a, b) => a.order - b.order) : [];

  return (
    <Box
      width="100%"
      py={{ base: 12, md: 16, lg: 20 }}
      position="relative"
      bg="transparent"
    >
      <Container 
        maxW="1100px"
        px={{ base: 4, md: 6 }}
        position="relative" 
        zIndex={2}
      >
        <VStack spacing={{ base: 8, md: 12 }}>
          
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
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
              mb={4}
            >
              {gallery_section_title}
            </Text>

            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
              mb={4}
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                {gallery_section_subtitle}
              </Text>
            </Text>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              mx="auto"
              lineHeight="1.7"
            >
              {gallery_section_description}
            </Text>
          </MotionBox>

          {/* Simple Mobile Slider */}
          <Box 
            display={{ base: "block", md: "none" }} 
            w="100%"
          >
            <Box
              overflowX="auto"
              pb={4}
            >
              <HStack spacing={4} w="max-content" px={2}>
                {sortedImages.map((image, index) => (
                  <Box key={image.id} minW="280px" h="200px">
                    <Box
                      bg="rgba(0,0,0,0.5)"
                      backdropFilter="blur(20px)"
                      borderRadius="xl"
                      border="1px solid rgba(0,198,255,0.15)"
                      overflow="hidden"
                      h="100%"
                      position="relative"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        p={3}
                        bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
                      >
                        <Text fontSize="sm" fontWeight="bold" color="white" noOfLines={1}>
                          {image.title}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </HStack>
            </Box>
          </Box>

          {/* Simple Desktop Grid */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={6}
            w="100%"
            display={{ base: "none", md: "grid" }}
          >
            {sortedImages.map((image, index) => (
              <Box key={image.id} h="250px">
                <Box
                  bg="rgba(0,0,0,0.5)"
                  backdropFilter="blur(20px)"
                  borderRadius="xl"
                  border="1px solid rgba(0,198,255,0.15)"
                  overflow="hidden"
                  h="100%"
                  position="relative"
                  cursor="pointer"
                  _hover={{
                    borderColor: "rgba(0,198,255,0.3)",
                    transform: "translateY(-4px)"
                  }}
                  transition="all 0.3s ease"
                >
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    p={4}
                    bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
                  >
                    <Text fontSize="md" fontWeight="bold" color="white" noOfLines={1}>
                      {image.title}
                    </Text>
                    <Text fontSize="sm" color="whiteAlpha.700" noOfLines={1}>
                      {image.description}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default DynamicGallery;