// sections/aufnahmen-sections/DynamicGallery.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  SimpleGrid, 
  VStack, 
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageSection, GalleryImage } from '../../types/page-section';

const MotionBox = motion(Box);

interface DynamicGalleryProps {
  data?: PageSection;
}

const DynamicGallery: React.FC<DynamicGalleryProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      if (!data?.gallery_images || !Array.isArray(data.gallery_images)) {
        setIsLoading(false);
        return;
      }

      const urls: Record<string, string> = {};
      
      await Promise.all(
        data.gallery_images.map(async (image, index) => {
          if (!image.image_url) return;
          const urlKey = image.id || `gallery-${index}`;

          // Prüfe ob es bereits eine externe URL ist
          if (image.image_url.startsWith('http://') || image.image_url.startsWith('https://')) {
            urls[urlKey] = image.image_url;
            return;
          }

          // Bereinige den Pfad
          let cleanPath = image.image_url;
          while (cleanPath.startsWith('gallery-images/')) {
            cleanPath = cleanPath.replace(/^gallery-images\//, '');
          }

          try {
            const response = await fetch('/api/storage/signed-url', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                bucket: 'gallery-images',
                path: cleanPath,
              }),
            });

            if (response.ok) {
              const result = await response.json();
              if (result.success && result.url) {
                urls[urlKey] = result.url;
              }
            }
          } catch (error) {
            console.error('Error loading gallery image:', error);
          }
        })
      );

      setImageUrls(urls);
      setIsLoading(false);
    };

    loadImages();
  }, [data]);

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

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6 }}
            w="100%"
            maxW="100%"
            minW={0}
          >
            {sortedImages.map((image, index) => {
              const urlKey = image.id || `gallery-${index}`;
              const src =
                imageUrls[urlKey] ||
                (image.image_url?.startsWith('http') ? image.image_url : '') ||
                '';
              return (
                <Box key={image.id || index} w="100%" minW={0} maxW="100%">
                  <Box
                    bg="rgba(0,0,0,0.5)"
                    backdropFilter="blur(20px)"
                    borderRadius="xl"
                    border="1px solid rgba(0,198,255,0.15)"
                    overflow="hidden"
                    position="relative"
                    cursor="pointer"
                    w="100%"
                    maxW="100%"
                    sx={{
                      aspectRatio: { base: '16 / 9', md: 'auto' },
                      minH: { md: '250px' },
                      h: { md: '250px' },
                    }}
                    _hover={{
                      borderColor: 'rgba(0,198,255,0.3)',
                      transform: 'translateY(-4px)',
                    }}
                    transition="all 0.3s ease"
                  >
                    <Image
                      src={src}
                      alt={image.title || ''}
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      w="100%"
                      h="100%"
                      maxW="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      zIndex={1}
                      p={{ base: 3, md: 4 }}
                      bgGradient="linear(to-t, rgba(0,0,0,0.9), transparent)"
                    >
                      <Text
                        fontSize={{ base: 'sm', md: 'md' }}
                        fontWeight="bold"
                        color="white"
                        noOfLines={2}
                      >
                        {image.title}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="whiteAlpha.700"
                        noOfLines={{ base: 2, md: 1 }}
                      >
                        {image.description}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default DynamicGallery;