import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react';
import { useGameStore } from '../stores/gameStore';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, logout } = useAuthStore();
  const { 
    availableQuizzes, 
    loadAvailableQuizzes,
    isLoading 
  } = useGameStore();

  const [selectedMascot, setSelectedMascot] = useState('creeper');

  useEffect(() => {
    if (user?.class_id) {
      loadAvailableQuizzes(user.class_id);
    }
  }, [user?.class_id, loadAvailableQuizzes]);

  const handleStartGame = (quizId: string) => {
    navigate(`/game/${quizId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const mascots = [
    { id: 'creeper', name: 'Creeper', emoji: '🟢', color: '#4ADE80' },
    { id: 'enderman', name: 'Enderman', emoji: '⚫', color: '#1F2937' },
    { id: 'pig', name: 'Cerdo', emoji: '🐷', color: '#F472B6' },
    { id: 'cow', name: 'Vaca', emoji: '🐄', color: '#FBBF24' },
    { id: 'chicken', name: 'Pollo', emoji: '🐓', color: '#EF4444' },
    { id: 'sheep', name: 'Oveja', emoji: '🐑', color: '#E5E7EB' }
  ];

  return (
    <Box 
      minH="100vh" 
      bg="#8B4513"
      bgImage="repeating-linear-gradient(0deg, #654321, #654321 16px, #8B4513 16px, #8B4513 32px)"
      p={4}
    >
      <VStack spacing={4} maxW="1000px" mx="auto">
        {/* Header Minecraft Style */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <HStack justify="space-between" align="center">
            <HStack spacing={4}>
              <Box
                w="64px"
                h="64px"
                bg={mascots.find(m => m.id === selectedMascot)?.color || '#4ADE80'}
                border="2px solid #000"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="32px"
                fontFamily="monospace"
              >
                {mascots.find(m => m.id === selectedMascot)?.emoji || '🟢'}
              </Box>
              <VStack align="start" spacing={1}>
                <Text fontSize="24px" color="white" fontFamily="monospace" fontWeight="bold">
                  {user?.name}
                </Text>
                <Text color="#CCCCCC" fontFamily="monospace">
                  Mascota: {mascots.find(m => m.id === selectedMascot)?.name || 'Creeper'}
                </Text>
              </VStack>
            </HStack>
            
            <Button
              bg="#DC2626"
              color="white"
              border="2px solid #7F1D1D"
              borderRadius="0"
              fontFamily="monospace"
              fontSize="14px"
              _hover={{ bg: "#B91C1C" }}
              onClick={handleLogout}
            >
              SALIR
            </Button>
          </HStack>
        </Box>

        {/* Select Mascot */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
            ELIGE TU MASCOTA:
          </Text>
          <Grid templateColumns="repeat(6, 1fr)" gap={2}>
            {mascots.map((mascot) => (
              <GridItem key={mascot.id}>
                <Button
                  w="full"
                  h="80px"
                  bg={selectedMascot === mascot.id ? mascot.color : '#555'}
                  border="2px solid #000"
                  borderRadius="0"
                  fontSize="24px"
                  fontFamily="monospace"
                  _hover={{ transform: 'scale(1.1)' }}
                  onClick={() => setSelectedMascot(mascot.id)}
                >
                  <VStack spacing={0}>
                    <Text fontSize="32px">{mascot.emoji}</Text>
                    <Text fontSize="10px" color="white">{mascot.name}</Text>
                  </VStack>
                </Button>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Available Games */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
            JUEGOS DISPONIBLES:
          </Text>

          {isLoading ? (
            <Text color="white" fontFamily="monospace">Cargando juegos...</Text>
          ) : availableQuizzes.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color="#CCCCCC" fontSize="16px" fontFamily="monospace">
                No hay juegos disponibles
              </Text>
              <Text color="#999" fontSize="14px" fontFamily="monospace">
                Tu docente agregará nuevos juegos pronto
              </Text>
            </Box>
          ) : (
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              {availableQuizzes.map((quiz) => (
                <GridItem key={quiz.id}>
                  <Box
                    bg="#4A5568"
                    border="2px solid #000"
                    borderRadius="0"
                    p={4}
                    cursor="pointer"
                    _hover={{ bg: "#2D3748", transform: 'translateY(-2px)' }}
                    onClick={() => handleStartGame(quiz.id)}
                  >
                    <VStack align="start" spacing={2}>
                      <Text fontSize="16px" color="white" fontFamily="monospace" fontWeight="bold">
                        {quiz.title}
                      </Text>
                      
                      <Text fontSize="12px" color="#CCCCCC" fontFamily="monospace">
                        {quiz.description}
                      </Text>
                      
                      <HStack spacing={2}>
                        <Box
                          bg="#22C55E"
                          color="white"
                          px={2}
                          py={1}
                          fontSize="10px"
                          fontFamily="monospace"
                          border="1px solid #000"
                        >
                          {quiz.questions.length} PREGUNTAS
                        </Box>
                        {quiz.time_limit && (
                          <Box
                            bg="#F59E0B"
                            color="white"
                            px={2}
                            py={1}
                            fontSize="10px"
                            fontFamily="monospace"
                            border="1px solid #000"
                          >
                            {Math.floor(quiz.time_limit / 60)} MIN
                          </Box>
                        )}
                      </HStack>
                      
                      <Button
                        bg="#22C55E"
                        color="white"
                        border="2px solid #16A34A"
                        borderRadius="0"
                        fontFamily="monospace"
                        fontSize="14px"
                        w="full"
                        mt={2}
                        _hover={{ bg: "#16A34A" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartGame(quiz.id);
                        }}
                      >
                        ⚔️ JUGAR AHORA
                      </Button>
                    </VStack>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default StudentDashboard;
