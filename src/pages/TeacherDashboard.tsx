import { useNavigate } from 'react-router-dom';
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
import { useAuthStore } from '../stores/authStore';

const TeacherDashboard = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const handleCreateGame = () => {
    navigate('/create-activity');
  };

  // Mock data simplificado
  const mockData = {
    totalStudents: 25,
    activeGames: 3,
    averageScore: 78,
    recentGames: [
      { id: '1', title: 'Matemáticas Básicas', completedBy: 18, avgScore: 82 },
      { id: '2', title: 'Lectura Comprensiva', completedBy: 15, avgScore: 75 },
      { id: '3', title: 'Ciencias Naturales', completedBy: 12, avgScore: 88 }
    ]
  };

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
            <VStack align="start" spacing={1}>
              <Text fontSize="24px" color="white" fontFamily="monospace" fontWeight="bold">
                🏫 PANEL DOCENTE
              </Text>
              <Text color="#CCCCCC" fontFamily="monospace">
                Profesor: {user?.name}
              </Text>
            </VStack>
            
            <HStack spacing={2}>
              <Button
                bg="#22C55E"
                color="white"
                border="2px solid #16A34A"
                borderRadius="0"
                fontFamily="monospace"
                fontSize="14px"
                _hover={{ bg: "#16A34A" }}
                onClick={handleCreateGame}
              >
                📝 CREAR QUIZ
              </Button>
              
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
          </HStack>
        </Box>

        {/* Stats */}
        <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
          <GridItem>
            <Box
              bg="#2D1810"
              border="4px solid #1A0D08"
              borderRadius="0"
              p={4}
              boxShadow="4px 4px 0px #0D0704"
              textAlign="center"
            >
              <Text fontSize="32px" color="#22C55E" fontFamily="monospace" fontWeight="bold">
                {mockData.totalStudents}
              </Text>
              <Text fontSize="12px" color="#CCCCCC" fontFamily="monospace">
                ESTUDIANTES
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="#2D1810"
              border="4px solid #1A0D08"
              borderRadius="0"
              p={4}
              boxShadow="4px 4px 0px #0D0704"
              textAlign="center"
            >
              <Text fontSize="32px" color="#F59E0B" fontFamily="monospace" fontWeight="bold">
                {mockData.activeGames}
              </Text>
              <Text fontSize="12px" color="#CCCCCC" fontFamily="monospace">
                JUEGOS ACTIVOS
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              bg="#2D1810"
              border="4px solid #1A0D08"
              borderRadius="0"
              p={4}
              boxShadow="4px 4px 0px #0D0704"
              textAlign="center"
            >
              <Text fontSize="32px" color="#3B82F6" fontFamily="monospace" fontWeight="bold">
                {mockData.averageScore}%
              </Text>
              <Text fontSize="12px" color="#CCCCCC" fontFamily="monospace">
                PROMEDIO
              </Text>
            </Box>
          </GridItem>
        </Grid>

        {/* Recent Games */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
            🎮 JUEGOS RECIENTES:
          </Text>

          <VStack spacing={2}>
            {mockData.recentGames.map((game) => (
              <Box
                key={game.id}
                w="full"
                bg="#4A5568"
                border="2px solid #000"
                borderRadius="0"
                p={3}
              >
                <HStack justify="space-between">
                  <VStack align="start" spacing={0}>
                    <Text fontSize="14px" color="white" fontFamily="monospace" fontWeight="bold">
                      {game.title}
                    </Text>
                    <Text fontSize="10px" color="#CCCCCC" fontFamily="monospace">
                      Completado por {game.completedBy} estudiantes
                    </Text>
                  </VStack>
                  
                  <Box
                    bg={game.avgScore >= 80 ? "#22C55E" : game.avgScore >= 60 ? "#F59E0B" : "#DC2626"}
                    color="white"
                    px={2}
                    py={1}
                    fontSize="12px"
                    fontFamily="monospace"
                    border="1px solid #000"
                    fontWeight="bold"
                  >
                    {game.avgScore}%
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Quick Actions */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
            ⚡ ACCIONES RÁPIDAS:
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <GridItem>
              <Button
                w="full"
                h="60px"
                bg="#22C55E"
                color="white"
                border="2px solid #16A34A"
                borderRadius="0"
                fontFamily="monospace"
                fontSize="14px"
                _hover={{ bg: "#16A34A", transform: 'scale(1.05)' }}
                onClick={handleCreateGame}
              >
                <VStack spacing={0}>
                  <Text fontSize="20px">📝</Text>
                  <Text fontSize="12px">CREAR NUEVO QUIZ</Text>
                </VStack>
              </Button>
            </GridItem>

            <GridItem>
              <Button
                w="full"
                h="60px"
                bg="#3B82F6"
                color="white"
                border="2px solid #1D4ED8"
                borderRadius="0"
                fontFamily="monospace"
                fontSize="14px"
                _hover={{ bg: "#1D4ED8", transform: 'scale(1.05)' }}
                onClick={() => toast({
                  title: 'Próximamente',
                  description: 'Funcionalidad en desarrollo',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                <VStack spacing={0}>
                  <Text fontSize="20px">📊</Text>
                  <Text fontSize="12px">VER REPORTES</Text>
                </VStack>
              </Button>
            </GridItem>

            <GridItem>
              <Button
                w="full"
                h="60px"
                bg="#8B5CF6"
                color="white"
                border="2px solid #7C3AED"
                borderRadius="0"
                fontFamily="monospace"
                fontSize="14px"
                _hover={{ bg: "#7C3AED", transform: 'scale(1.05)' }}
                onClick={() => toast({
                  title: 'Próximamente',
                  description: 'Funcionalidad en desarrollo',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                <VStack spacing={0}>
                  <Text fontSize="20px">👨‍🎓</Text>
                  <Text fontSize="12px">GESTIONAR ALUMNOS</Text>
                </VStack>
              </Button>
            </GridItem>

            <GridItem>
              <Button
                w="full"
                h="60px"
                bg="#F59E0B"
                color="white"
                border="2px solid #D97706"
                borderRadius="0"
                fontFamily="monospace"
                fontSize="14px"
                _hover={{ bg: "#D97706", transform: 'scale(1.05)' }}
                onClick={() => toast({
                  title: 'Próximamente',
                  description: 'Funcionalidad en desarrollo',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                })}
              >
                <VStack spacing={0}>
                  <Text fontSize="20px">⚙️</Text>
                  <Text fontSize="12px">CONFIGURACIÓN</Text>
                </VStack>
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeacherDashboard;
