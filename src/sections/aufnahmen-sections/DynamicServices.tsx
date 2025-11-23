// components/sections/DynamicServicesSection.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Text, 
  SimpleGrid, 
  VStack, 
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PageSection, ServiceItem, IconName } from '../../types/page-section';

const MotionBox = motion(Box);

// Icon Components - React Icons
import { FiVideo, FiCamera, FiFilm, FiUser, FiMaximize2, FiMap } from 'react-icons/fi';

const ServiceIcons: Record<IconName, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  video: ({ className, style }) => <FiVideo className={className} style={style} />,
  camera: ({ className, style }) => <FiCamera className={className} style={style} />,
  production: ({ className, style }) => <FiFilm className={className} style={style} />,
  pilot: ({ className, style }) => <FiUser className={className} style={style} />,
  measurement: ({ className, style }) => <FiMaximize2 className={className} style={style} />,
  mapping: ({ className, style }) => <FiMap className={className} style={style} />,
};

interface DynamicServicesSectionProps {
  data?: PageSection;
}

const DynamicServicesSection: React.FC<DynamicServicesSectionProps> = ({ data }) => {
  // DEBUG LOGS
  console.log('🚨 DYNAMIC SERVICES SECTION RECEIVED:', data);
  console.log('🚨 SERVICES:', data?.services);
  console.log('🚨 SERVICES TYPE:', typeof data?.services);
  console.log('🚨 IS ARRAY:', Array.isArray(data?.services));
  
  if (data?.services) {
    console.log('🚨 SERVICES LENGTH:', data.services.length);
    console.log('🚨 FIRST SERVICE:', data.services[0]);
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    console.log('🚨 NO DATA PROVIDED TO COMPONENT');
    return (
      <Box py={16} textAlign="center">
        <Text color="whiteAlpha.600">Seite nicht gefunden</Text>
      </Box>
    );
  }

  const {
    title,
    subtitle,
    description_left,
    description_right,
    services = []
  } = data;

  // Services nach order sortieren - SICHER
  const sortedServices = Array.isArray(services) ? [...services].sort((a, b) => a.order - b.order) : [];
  
  console.log('🚨 SORTED SERVICES:', sortedServices);
  console.log('🚨 SORTED SERVICES LENGTH:', sortedServices.length);

  return (
    <Box
      position="relative"
      py={{ base: 16, md: 20, lg: 24 }}
      bg="transparent"
      overflow="hidden"
    >
      {/* Background Elements */}
      <Box 
        position="absolute" 
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="radial-gradient(circle at 80% 20%, rgba(0,198,255,0.02) 0%, transparent 60%)"
        pointerEvents="none"
      />
      
      <Container 
        maxW="container.lg"
        px={{ base: 4, md: 6 }}
        position="relative"
        zIndex={10}
      >
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 12, md: 16 }}
        >
          <Text
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="700"
            color="white"
            mb={4}
            letterSpacing="tight"
          >
            {title || 'Services'}
          </Text>
          
          {subtitle && (
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.700"
              mb={6}
            >
              {subtitle}
            </Text>
          )}
          
          {(description_left || description_right) && (
            <Box
              maxW={{ base: "100%", md: "2xl" }}
              mx="auto"
              px={{ base: 4, md: 0 }}
            >
              <HStack 
                spacing={{ base: 4, md: 8 }}
                justify="center"
                flexWrap={{ base: "wrap", md: "nowrap" }}
                mb={6}
              >
                {description_left && (
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="whiteAlpha.800"
                    flex="1"
                    textAlign={{ base: "center", md: "right" }}
                  >
                    {description_left}
                  </Text>
                )}
                
                {description_left && description_right && (
                  <Box
                    w={{ base: "full", md: "1px" }}
                    h={{ base: "1px", md: "100px" }}
                    bg="rgba(0,198,255,0.3)"
                  />
                )}
                
                {description_right && (
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="whiteAlpha.800"
                    flex="1"
                    textAlign={{ base: "center", md: "left" }}
                  >
                    {description_right}
                  </Text>
                )}
              </HStack>
            </Box>
          )}
        </MotionBox>

        {/* Services - IMMER RENDERN wenn vorhanden */}
        {sortedServices && sortedServices.length > 0 ? (
          <>
            {/* Mobile Slider */}
            <Box
              display={{ base: "block", md: "none" }}
              w="100%"
              position="relative"
            >
              <Text
                fontSize="xs"
                color="whiteAlpha.500"
                textAlign="center"
                mb={4}
              >
                ← Swipe für mehr Services →
              </Text>
              
              <Box
                overflowX="auto"
                pb={4}
                css={{
                  '&::-webkit-scrollbar': {
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,198,255,0.5)',
                    borderRadius: '10px',
                  },
                }}
              >
                <HStack
                  spacing={4}
                  w="max-content"
                  px={2}
                  sx={{ scrollSnapType: 'x mandatory' }}
                >
                  {sortedServices.map((service, index) => (
                    <Box
                      key={service.id}
                      minW="280px"
                      maxW="280px"
                      sx={{ scrollSnapAlign: 'center' }}
                    >
                      <ServiceCard 
                        service={service}
                        index={index}
                        isVisible={isVisible}
                        isMobile={true}
                      />
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Box>

            {/* Desktop Grid */}
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 4 }} 
              spacing={{ base: 6, md: 8 }}
              w="100%"
              display={{ base: "none", md: "grid" }}
            >
              {sortedServices.map((service, index) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  isMobile={false}
                />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Box textAlign="center" py={8}>
            <Text color="whiteAlpha.600" fontSize="lg">
              Keine Services verfügbar (DEBUG: services.length = {sortedServices?.length || 0})
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

// Service Card Component
const ServiceCard: React.FC<{ 
  service: ServiceItem; 
  index: number; 
  isVisible: boolean;
  isMobile?: boolean;
}> = ({ service, index, isVisible, isMobile = false }) => {
  const IconComponent = ServiceIcons[service.icon_name] || ServiceIcons.video;
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay: isMobile ? 0.1 + (index * 0.05) : 0.1 + (index * 0.1),
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      h={isMobile ? "320px" : "100%"}
      w="100%"
    >
      <Box
        bg="rgba(0,0,0,0.3)"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        border="1px solid rgba(0,198,255,0.2)"
        p={{ base: 6, md: 8 }}
        h="100%"
        position="relative"
        overflow="hidden"
        cursor="pointer"
        _hover={{
          borderColor: service.color,
          boxShadow: `0 10px 40px -10px ${service.color}40`
        }}
        transition="all 0.3s ease"
        role="group"
      >
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={`linear-gradient(135deg, ${service.color}10 0%, transparent 70%)`}
          pointerEvents="none"
        />
        
        <VStack spacing={4} align="center" position="relative" zIndex={2} h="100%">
          {/* Icon */}
          <Box
            w={{ base: "60px", md: "70px" }}
            h={{ base: "60px", md: "70px" }}
            bg={`${service.color}20`}
            borderRadius="xl"
            border={`1px solid ${service.color}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            _groupHover={{ transform: "scale(1.1)" }}
            transition="transform 0.3s ease"
          >
            <IconComponent className="w-full h-full" style={{ color: service.color }} />
          </Box>

          {/* Content */}
          <VStack spacing={2} textAlign="center" flex="1">
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="700"
              color="white"
              letterSpacing="wide"
            >
              {service.title}
            </Text>
            
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.800"
              fontWeight="500"
              lineHeight="1.4"
            >
              {service.description}
            </Text>
            
            {service.details && (
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="whiteAlpha.600"
                textAlign="center"
                lineHeight="1.4"
                mt={2}
              >
                {service.details}
              </Text>
            )}
          </VStack>
        </VStack>

        {/* Hover Effect */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderRadius="xl"
          opacity={0}
          bg={`linear-gradient(45deg, ${service.color}20, transparent)`}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.3s ease"
          pointerEvents="none"
        />
      </Box>
    </MotionBox>
  );
};

export default DynamicServicesSection;