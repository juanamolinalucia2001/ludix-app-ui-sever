import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Progress,
  Badge,
  Alert,
  AlertIcon,
  Circle,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';

const GamePage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const {
    currentSession,
    currentQuiz,
    timeRemaining,
    isGameActive,
    showResults,
    startGame,
    submitAnswer,
    endGame,
    updateTimer,
    resetGameState
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeRemaining);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          updateTimer(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, timeLeft, updateTimer]);

  // Initialize game
  useEffect(() => {
    if (quizId && !currentSession) {
      startGame(quizId);
    }
  }, [quizId, currentSession, startGame]);

  // Update timeLeft when timeRemaining changes
  useEffect(() => {
    setTimeLeft(timeRemaining);
  }, [timeRemaining]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz || !currentSession) return;

    const currentQuestion = currentQuiz.questions[currentSession.current_question];
    submitAnswer(currentQuestion.id, selectedAnswer);
    setSelectedAnswer(null);
  };

  const handleEndGame = () => {
    endGame();
    onClose();
  };

  const handleExitGame = () => {
    resetGameState();
    navigate('/student');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show results screen
  if (showResults && currentSession) {
    const percentage = Math.round((currentSession.score / currentQuiz!.questions.length) * 100);
    
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Card maxW="600px" w="full" shadow="2xl" borderRadius="2xl">
          <CardBody p={8}>
            <VStack spacing={6} textAlign="center">
              <Circle size="120px" bg="ludix.success" color="white" fontSize="4xl">
                🎉
              </Circle>
              
              <Heading size="lg" color="ludix.primary">
                ¡Juego Completado!
              </Heading>
              
              <VStack spacing={3}>
                <Text fontSize="xl" fontWeight="bold">
                  Tu puntuación: {currentSession.score}/{currentQuiz!.questions.length}
                </Text>
                <Text fontSize="lg" color="gray.600">
                  {percentage}% de respuestas correctas
                </Text>
              </VStack>

              {/* Performance Badge */}
              <Badge
                colorScheme={percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red'}
                variant="solid"
                fontSize="md"
                p={2}
                borderRadius="lg"
              >
                {percentage >= 80 ? '🏆 ¡Excelente!' : percentage >= 60 ? '👍 ¡Bien hecho!' : '💪 ¡Sigue practicando!'}
              </Badge>

              <HStack spacing={4} w="full">
                <Button
                  colorScheme="blue"
                  size="lg"
                  flex={1}
                  onClick={() => window.location.reload()}
                >
                  🔄 Jugar de nuevo
                </Button>
                <Button
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  flex={1}
                  onClick={handleExitGame}
                >
                  🏠 Volver al inicio
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    );
  }

  // Loading or no quiz
  if (!currentQuiz || !currentSession || !isGameActive) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="xl">Cargando juego...</Text>
          <Progress size="lg" isIndeterminate colorScheme="blue" w="300px" />
        </VStack>
      </Box>
    );
  }

  const currentQuestion = currentQuiz.questions[currentSession.current_question];
  const isLastQuestion = currentSession.current_question === currentQuiz.questions.length - 1;
  const progress = ((currentSession.current_question + 1) / currentQuiz.questions.length) * 100;

  return (
    <Box minH="100vh" p={4}>
      <VStack spacing={6} maxW="800px" mx="auto">
        {/* Header with progress and timer */}
        <Card w="full" shadow="lg" borderRadius="xl">
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color="gray.600">Pregunta {currentSession.current_question + 1} de {currentQuiz.questions.length}</Text>
                  <Text fontSize="lg" fontWeight="bold" color="ludix.primary">{currentQuiz.title}</Text>
                </VStack>
                
                <VStack align="end" spacing={1}>
                  <Text fontSize="sm" color="gray.600">Tiempo restante</Text>
                  <Text 
                    fontSize="lg" 
                    fontWeight="bold" 
                    color={timeLeft < 60 ? "red.500" : "ludix.primary"}
                  >
                    {formatTime(timeLeft)}
                  </Text>
                </VStack>
              </HStack>
              
              <Progress 
                value={progress} 
                colorScheme="blue" 
                size="lg" 
                w="full" 
                borderRadius="full"
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Warning for low time */}
        {timeLeft < 60 && (
          <Alert status="warning" borderRadius="xl">
            <AlertIcon />
            ¡Queda menos de un minuto! ⏰
          </Alert>
        )}

        {/* Question Card */}
        <Card w="full" shadow="lg" borderRadius="xl">
          <CardBody p={8}>
            <VStack spacing={6}>
              <Heading size="md" textAlign="center" color="ludix.dark">
                {currentQuestion.text}
              </Heading>

              {/* Answer Options */}
              <VStack spacing={3} w="full">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "solid" : "outline"}
                    colorScheme="blue"
                    size="lg"
                    w="full"
                    h="auto"
                    p={4}
                    borderRadius="xl"
                    textAlign="left"
                    justifyContent="flex-start"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    onClick={() => handleAnswerSelect(index)}
                    _hover={{ transform: selectedAnswer === index ? 'none' : 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <HStack spacing={3} w="full">
                      <Circle 
                        size="30px" 
                        bg={selectedAnswer === index ? "white" : "ludix.primary"} 
                        color={selectedAnswer === index ? "ludix.primary" : "white"}
                        fontWeight="bold"
                      >
                        {String.fromCharCode(65 + index)}
                      </Circle>
                      <Text fontSize="md">{option}</Text>
                    </HStack>
                  </Button>
                ))}
              </VStack>

              {/* Submit Button */}
              <HStack spacing={4} w="full">
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="lg"
                  onClick={onOpen}
                >
                  ⏹️ Terminar juego
                </Button>
                
                <Button
                  colorScheme="blue"
                  size="lg"
                  flex={1}
                  onClick={handleSubmitAnswer}
                  isDisabled={selectedAnswer === null}
                >
                  {isLastQuestion ? '🏁 Finalizar' : '➡️ Siguiente pregunta'}
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>

      {/* Confirm Exit Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader color="ludix.primary">¿Terminar el juego?</ModalHeader>
          <ModalBody>
            <Text>Si terminas ahora, tu progreso se guardará pero no podrás continuar desde donde lo dejaste.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleEndGame}>
              Sí, terminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GamePage;
