import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Avatar,
  useToast,
  Badge,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { useGameStore } from '../stores/gameStore';
import { useNavigate } from 'react-router-dom';

// Mock mascot options
const MASCOT_OPTIONS = [
  { value: 'dragon', label: '🐉 Dragón', emoji: '🐉' },
  { value: 'unicorn', label: '🦄 Unicornio', emoji: '🦄' },
  { value: 'robot', label: '🤖 Robot', emoji: '🤖' },
  { value: 'cat', label: '🐱 Gatito', emoji: '🐱' },
  { value: 'dog', label: '🐶 Perrito', emoji: '🐶' }
];

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createStudentProfile, studentProfile } = useGameStore();

  const [formData, setFormData] = useState({
    name: studentProfile?.name || '',
    mascot: studentProfile?.mascot || 'dragon'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa tu nombre',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    createStudentProfile(formData.name, formData.mascot as any);
    
    toast({
      title: '¡Perfil creado!',
      description: `¡Hola ${formData.name}! Tu mascota ${MASCOT_OPTIONS.find(m => m.value === formData.mascot)?.emoji} te está esperando`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });

    navigate('/student');
  };

  const selectedMascot = MASCOT_OPTIONS.find(m => m.value === formData.mascot);

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={4}
    >
      <Card maxW="600px" w="full" shadow="2xl" borderRadius="2xl">
        <CardBody p={8}>
          <VStack spacing={6}>
            <VStack spacing={2} textAlign="center">
              <Heading size="lg" color="ludix.primary">
                ¡Crea tu Perfil de Juego! 🎮
              </Heading>
              <Text color="gray.600">
                Elige tu nombre y mascota favorita para empezar a jugar
              </Text>
            </VStack>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={6}>
                {/* Name Input */}
                <FormControl isRequired>
                  <FormLabel fontSize="lg" fontWeight="bold" color="ludix.primary">
                    ¿Cómo te llamas?
                  </FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Escribe tu nombre aquí..."
                    size="lg"
                    borderRadius="xl"
                    fontSize="lg"
                    textAlign="center"
                    bg="white"
                    _focus={{ borderColor: 'ludix.primary', boxShadow: '0 0 0 1px var(--chakra-colors-ludix-primary)' }}
                  />
                </FormControl>

                {/* Mascot Selection */}
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="bold" color="ludix.primary" textAlign="center">
                    Elige tu mascota 🎭
                  </FormLabel>
                  
                  {/* Selected Mascot Display */}
                  <VStack spacing={3} mb={4}>
                    <Avatar
                      size="2xl"
                      name={selectedMascot?.emoji}
                      bg="ludix.light"
                      color="ludix.primary"
                      fontSize="4xl"
                    >
                      {selectedMascot?.emoji}
                    </Avatar>
                    <Badge colorScheme="blue" variant="solid" fontSize="md" p={2} borderRadius="lg">
                      {selectedMascot?.label}
                    </Badge>
                  </VStack>

                  {/* Mascot Grid */}
                  <Grid templateColumns="repeat(5, 1fr)" gap={3}>
                    {MASCOT_OPTIONS.map((mascot) => (
                      <GridItem key={mascot.value}>
                        <Button
                          variant={formData.mascot === mascot.value ? 'solid' : 'outline'}
                          colorScheme="blue"
                          size="lg"
                          h="80px"
                          w="full"
                          fontSize="3xl"
                          borderRadius="xl"
                          onClick={() => setFormData({ ...formData, mascot: mascot.value as any })}
                          _hover={{ transform: 'scale(1.05)' }}
                          transition="all 0.2s"
                        >
                          {mascot.emoji}
                        </Button>
                      </GridItem>
                    ))}
                  </Grid>
                </FormControl>

                {/* Preview Card */}
                <Card w="full" bg="ludix.light" borderRadius="xl" border="2px solid" borderColor="ludix.primary">
                  <CardBody>
                    <VStack spacing={3}>
                      <Text fontSize="sm" color="ludix.primary" fontWeight="bold">
                        Vista previa de tu perfil:
                      </Text>
                      <HStack spacing={4}>
                        <Avatar
                          size="lg"
                          bg="white"
                          color="ludix.primary"
                          fontSize="2xl"
                        >
                          {selectedMascot?.emoji}
                        </Avatar>
                        <VStack align="start" spacing={1}>
                          <Text fontSize="lg" fontWeight="bold" color="ludix.dark">
                            {formData.name || 'Tu nombre'}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Mascota: {selectedMascot?.label}
                          </Text>
                        </VStack>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  fontSize="xl"
                  h="60px"
                  borderRadius="xl"
                  isDisabled={!formData.name.trim()}
                >
                  🚀 ¡Empezar a Jugar!
                </Button>
              </VStack>
            </form>

            {/* Help Button */}
            <Button
              variant="ghost"
              colorScheme="gray"
              size="sm"
              onClick={onOpen}
            >
              ¿Necesitas ayuda? 🤔
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Help Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader color="ludix.primary">¿Cómo funciona? 🎯</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="start">
              <HStack>
                <Text fontSize="2xl">👤</Text>
                <Text>Escribe tu nombre para que todos sepan quién eres</Text>
              </HStack>
              <HStack>
                <Text fontSize="2xl">🎭</Text>
                <Text>Elige una mascota que te acompañará en todos los juegos</Text>
              </HStack>
              <HStack>
                <Text fontSize="2xl">🎮</Text>
                <Text>Una vez listo, podrás acceder a todos los juegos de tu clase</Text>
              </HStack>
              <HStack>
                <Text fontSize="2xl">📊</Text>
                <Text>Tu progreso se guardará automáticamente</Text>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfileSetupPage;
