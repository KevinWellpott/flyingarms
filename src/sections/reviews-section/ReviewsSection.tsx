// sections/reviews-section/ReviewsSection.tsx - YOUTUBE VERSION
'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Text, 
  SimpleGrid, 
  VStack, 
  HStack,
  Image,
  Badge,
  Avatar,
  AspectRatio
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface Review {
  id: string;
  customer_name: string;
  company_name?: string;
  rating: number;
  review_text: string;
  project_type?: string;
  project_description?: string;
  video_url?: string;
  image_url?: string;
  is_featured: boolean;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

// YOUTUBE URL CLEANER - Branding entfernen
const cleanYoutubeUrl = (url: string): string => {
  if (!url) return url;
  
  try {
    // YouTube Video ID extrahieren
    let videoId = '';
    
    if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    
    // Clean YouTube Embed URL
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1`;
  } catch (error) {
    return url; // Fallback
  }
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const featuredReviews = reviews.filter(r => r.is_featured);
  const normalReviews = reviews.filter(r => !r.is_featured);

  return (
    <Box width="100%" py={{ base: 20, md: 32 }} bg="transparent">
      <Container maxW="1100px" px={{ base: 4, md: 6 }}>
        <VStack spacing={16}>
          
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
              KUNDENSTIMMEN
            </Text>
            <Text
              as="h2"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="900"
              color="white"
              lineHeight="1.1"
            >
              <Text as="span" bgGradient="linear(to-r, cyan.300, cyan.500)" bgClip="text">
                Was unsere Kunden sagen
              </Text>
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.600"
              maxW="600px"
              lineHeight="1.7"
            >
              Überzeugen Sie sich von der Qualität unserer Arbeit
            </Text>
          </VStack>

          {/* Featured Reviews */}
          {featuredReviews.map((review) => (
            <FeaturedReviewCard key={review.id} review={review} />
          ))}

          {/* Normal Reviews Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} w="100%">
            {normalReviews.map((review) => (
              <NormalReviewCard key={review.id} review={review} />
            ))}
          </SimpleGrid>

        </VStack>
      </Container>
    </Box>
  );
};

// Featured Review Card - YOUTUBE VERSION
const FeaturedReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = (rating: number) => (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <Box key={i} color={i < rating ? "yellow.400" : "gray.600"} fontSize="sm">★</Box>
      ))}
    </HStack>
  );

  return (
    <Box
      w="100%"
      maxW="900px"
      mx="auto"
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(20px)"
      borderRadius="2xl"
      border="2px solid rgba(0,198,255,0.4)"
      p={{ base: 8, md: 12 }}
      position="relative"
    >
      <VStack spacing={8} align="flex-start">
        
        {/* Media */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
          
          {/* YouTube Video */}
          {review.video_url && (
            <Box>
              <AspectRatio ratio={16/9}>
                <iframe
                  src={cleanYoutubeUrl(review.video_url)}
                  style={{ borderRadius: '16px', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
              <Text fontSize="sm" color="cyan.300" mt={3} fontWeight="600">
                🎥 Projektvideo
              </Text>
            </Box>
          )}
          
          {/* Image */}
          {review.image_url && (
            <Box>
              <AspectRatio ratio={16/9}>
                <Image
                  src={review.image_url}
                  alt="Projekt"
                  objectFit="cover"
                  borderRadius="xl"
                />
              </AspectRatio>
              <Text fontSize="sm" color="cyan.300" mt={3} fontWeight="600">
                📸 Projektbild
              </Text>
            </Box>
          )}
          
        </SimpleGrid>

        {/* Content */}
        <VStack spacing={6} align="flex-start" w="100%">
          
          {/* Rating + Type */}
          <HStack justify="space-between" w="100%" flexWrap="wrap" gap={4}>
            {renderStars(review.rating)}
            {review.project_type && (
              <Badge
                bg="rgba(0,198,255,0.2)"
                color="cyan.300"
                borderRadius="xl"
                px={4}
                py={2}
                fontSize="xs"
                border="1px solid rgba(0,198,255,0.3)"
              >
                {review.project_type}
              </Badge>
            )}
          </HStack>

          {/* Review Text */}
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="white"
            lineHeight="1.6"
            fontStyle="italic"
          >
             &quot;{review.review_text}&quot;

          </Text>

          {/* Project Description */}
          <Box 
            w="100%"
            p={6}
            bg="rgba(0,198,255,0.1)"
            border="1px solid rgba(0,198,255,0.3)"
            borderRadius="xl"
          >
            <Text 
              fontSize="xs" 
              color="cyan.300" 
              fontWeight="700" 
              textTransform="uppercase"
              letterSpacing="2px"
              mb={3}
            >
              PROJEKT:
            </Text>
            <Text
              fontSize="sm"
              color="whiteAlpha.800"
              lineHeight="1.5"
            >
              {review.project_description || 'Detaillierte Projektbeschreibung folgt in Kürze.'}
            </Text>
          </Box>

          {/* Customer */}
          <HStack spacing={3} w="100%">
            <Avatar
              size="sm"
              name={review.customer_name}
              bg="rgba(0,198,255,0.3)"
              color="white"
            />
            <VStack spacing={0} align="flex-start" flex="1">
              <Text fontSize="sm" fontWeight="600" color="white">
                {review.customer_name}
              </Text>
              {review.company_name && (
                <Text fontSize="xs" color="whiteAlpha.600">
                  {review.company_name}
                </Text>
              )}
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

// Normal Review Card - YOUTUBE VERSION
const NormalReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = (rating: number) => (
    <HStack spacing={1}>
      {[...Array(5)].map((_, i) => (
        <Box key={i} color={i < rating ? "yellow.400" : "gray.600"} fontSize="sm">★</Box>
      ))}
    </HStack>
  );

  return (
    <Box
      bg="rgba(0,0,0,0.4)"
      backdropFilter="blur(20px)"
      borderRadius="xl"
      border="1px solid rgba(0,198,255,0.2)"
      p={{ base: 6, md: 8 }}
      h="100%"
      minH="600px"
      display="flex"
      flexDirection="column"
      _hover={{
        borderColor: "rgba(0,198,255,0.4)",
        transform: "translateY(-4px)"
      }}
      transition="all 0.3s ease"
    >
      <VStack spacing={6} align="flex-start" flex="1" h="100%">
        
        {/* Media Stack */}
        <VStack spacing={4} w="100%">
          {review.video_url && (
            <Box w="100%">
              <AspectRatio ratio={16/9}>
                <iframe
                  src={cleanYoutubeUrl(review.video_url)}
                  style={{ borderRadius: '12px', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </Box>
          )}
          
          {review.image_url && (
            <Box w="100%">
              <AspectRatio ratio={16/9}>
                <Image
                  src={review.image_url}
                  alt="Projekt"
                  objectFit="cover"
                  borderRadius="xl"
                />
              </AspectRatio>
            </Box>
          )}
        </VStack>

        {/* Content */}
        <VStack spacing={4} align="flex-start" flex="1" w="100%">
          
          {/* Rating + Type */}
          <HStack justify="space-between" w="100%" flexWrap="wrap" gap={2}>
            {renderStars(review.rating)}
            {review.project_type && (
              <Badge
                bg="rgba(0,198,255,0.2)"
                color="cyan.300"
                borderRadius="md"
                px={3}
                py={1}
                fontSize="xs"
              >
                {review.project_type}
              </Badge>
            )}
          </HStack>

          {/* Review Text */}
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="white"
            lineHeight="1.6"
            fontStyle="italic"
            flex="1"
          >
              &quot;{review.review_text}&quot;

          </Text>

          {/* Project Description Short */}
          <Box
            w="100%"
            p={4}
            bg="rgba(0,198,255,0.05)"
            borderRadius="lg"
            border="1px solid rgba(0,198,255,0.1)"
            mt="auto"
          >
            <Text fontSize="xs" color="cyan.300" fontWeight="bold" mb={2}>
              PROJEKT:
            </Text>
            <Text fontSize="sm" color="whiteAlpha.800" lineHeight="1.5" noOfLines={3}>
              {review.project_description || 'Projektdetails werden geladen...'}
            </Text>
          </Box>

          {/* Customer */}
          <HStack spacing={3} w="100%">
            <Avatar
              size="sm"
              name={review.customer_name}
              bg="rgba(0,198,255,0.3)"
              color="white"
            />
            <VStack spacing={0} align="flex-start" flex="1">
              <Text fontSize="sm" fontWeight="600" color="white">
                {review.customer_name}
              </Text>
              {review.company_name && (
                <Text fontSize="xs" color="whiteAlpha.600">
                  {review.company_name}
                </Text>
              )}
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default ReviewsSection;