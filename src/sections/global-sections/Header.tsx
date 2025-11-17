'use client'

import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Collapse,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaDrone } from 'react-icons/fa'
import Link from 'next/link'

export default function Header() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="transparent"
      backdropFilter="blur(20px)"
      borderBottom="1px solid rgba(56, 189, 248, 0.2)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
    >
      <Container maxW="8xl" py={4}>
        <Flex align="center" justify="space-between">
          {/* Logo */}
          <Link href="/">
            <HStack spacing={2}>
              <Icon as={FaDrone} color="brand.400" w={6} h={6} />
              <VStack spacing={0} align="start">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                  textShadow="0 0 20px rgba(56, 189, 248, 0.5)"
                >
                  Flying-Arms
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="medium"
                >
                  Die schärfste Sicht von oben.
                </Text>
              </VStack>
            </HStack>
          </Link>

          {/* Desktop CTA */}
          <Button
            variant="gradient"
            size="lg"
            borderRadius="full"
            px={8}
            display={{ base: 'none', lg: 'flex' }}
          >
            Jetzt los fliegen
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            color="white"
            aria-label="Menu öffnen"
            _hover={{
              bg: 'rgba(56, 189, 248, 0.1)',
            }}
          />
        </Flex>
      </Container>

      {/* Mobile Menu */}
      <Collapse in={isOpen}>
        <Box
          bg="rgba(15, 23, 42, 0.98)"
          backdropFilter="blur(20px)"
          p={4}
        >
          <VStack spacing={4}>
            <Button
              variant="gradient"
              size="lg"
              w="full"
              borderRadius="full"
            >
              Jetzt los fliegen
            </Button>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  )
}
