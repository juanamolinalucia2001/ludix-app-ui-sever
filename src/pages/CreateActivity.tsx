import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Grid,
  GridItem,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreateActivity = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    { 
      text: '', 
      options: ['', '', '', ''], 
      correct: 0 
    }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    if (field === 'text') {
      newQuestions[index].text = value;
    } else if (field === 'correct') {
      newQuestions[index].correct = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      newQuestions[index].options[optionIndex] = value;
    }
    setQuestions(newQuestions);
  };

  const saveQuiz = () => {
    if (!quizTitle.trim()) {
      toast({
        title: 'Error',
        description: 'Debes agregar un título',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Aquí iría la lógica para guardar en el backend
    toast({
      title: '¡Quiz Creado!',
      description: 'El quiz ha sido guardado exitosamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    navigate('/teacher');
  };

  return (
    <Box 
      minH="100vh" 
      bg="#8B4513"
      bgImage="repeating-linear-gradient(0deg, #654321, #654321 16px, #8B4513 16px, #8B4513 32px)"
      p={4}
    >
      <VStack spacing={4} maxW="1000px" mx="auto">
        {/* Header */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <HStack justify="space-between" align="center">
            <Text fontSize="24px" color="white" fontFamily="monospace" fontWeight="bold">
              🏗️ CREAR QUIZ
            </Text>
            
            <Button
              bg="#DC2626"
              color="white"
              border="2px solid #7F1D1D"
              borderRadius="0"
              fontFamily="monospace"
              fontSize="14px"
              _hover={{ bg: "#B91C1C" }}
              onClick={() => navigate('/teacher')}
            >
              VOLVER
            </Button>
          </HStack>
        </Box>

        {/* Quiz Info */}
        <Box
          w="full"
          bg="#2D1810"
          border="4px solid #1A0D08"
          borderRadius="0"
          p={4}
          boxShadow="4px 4px 0px #0D0704"
        >
          <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
            INFORMACIÓN DEL QUIZ:
          </Text>
          
          <VStack spacing={3}>
            <Box w="full">
              <Text color="#CCCCCC" fontFamily="monospace" mb={1}>Título:</Text>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Ej: Matemáticas - Sumas y Restas"
                bg="#555"
                color="white"
                border="2px solid #000"
                borderRadius="0"
                fontFamily="monospace"
                _placeholder={{ color: '#AAA' }}
              />
            </Box>
            
            <Box w="full">
              <Text color="#CCCCCC" fontFamily="monospace" mb={1}>Descripción:</Text>
              <Textarea
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                placeholder="Describe de qué trata este quiz..."
                bg="#555"
                color="white"
                border="2px solid #000"
                borderRadius="0"
                fontFamily="monospace"
                resize="none"
                h="80px"
                _placeholder={{ color: '#AAA' }}
              />
            </Box>
          </VStack>
        </Box>

        {/* Questions */}
        {questions.map((question, qIndex) => (
          <Box
            key={qIndex}
            w="full"
            bg="#2D1810"
            border="4px solid #1A0D08"
            borderRadius="0"
            p={4}
            boxShadow="4px 4px 0px #0D0704"
          >
            <Text fontSize="18px" color="white" fontFamily="monospace" fontWeight="bold" mb={3}>
              PREGUNTA {qIndex + 1}:
            </Text>
            
            <VStack spacing={3}>
              <Box w="full">
                <Text color="#CCCCCC" fontFamily="monospace" mb={1}>Pregunta:</Text>
                <Textarea
                  value={question.text}
                  onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                  placeholder="Escribe tu pregunta aquí..."
                  bg="#555"
                  color="white"
                  border="2px solid #000"
                  borderRadius="0"
                  fontFamily="monospace"
                  resize="none"
                  h="80px"
                  _placeholder={{ color: '#AAA' }}
                />
              </Box>
              
              <Grid templateColumns="repeat(2, 1fr)" gap={3} w="full">
                {question.options.map((option, oIndex) => (
                  <GridItem key={oIndex}>
                    <HStack>
                      <Button
                        w="40px"
                        h="40px"
                        bg={question.correct === oIndex ? "#22C55E" : "#DC2626"}
                        color="white"
                        border="2px solid #000"
                        borderRadius="0"
                        fontFamily="monospace"
                        fontSize="12px"
                        _hover={{ transform: 'scale(1.1)' }}
                        onClick={() => updateQuestion(qIndex, 'correct', oIndex)}
                      >
                        {String.fromCharCode(65 + oIndex)}
                      </Button>
                      <Input
                        value={option}
                        onChange={(e) => updateQuestion(qIndex, `option-${oIndex}`, e.target.value)}
                        placeholder={`Opción ${String.fromCharCode(65 + oIndex)}`}
                        bg="#555"
                        color="white"
                        border="2px solid #000"
                        borderRadius="0"
                        fontFamily="monospace"
                        _placeholder={{ color: '#AAA' }}
                      />
                    </HStack>
                  </GridItem>
                ))}
              </Grid>
              
              <Text fontSize="12px" color="#CCCCCC" fontFamily="monospace">
                ✅ Respuesta correcta: {String.fromCharCode(65 + question.correct)}
              </Text>
            </VStack>
          </Box>
        ))}

        {/* Add Question Button */}
        <Button
          bg="#3B82F6"
          color="white"
          border="2px solid #1D4ED8"
          borderRadius="0"
          fontFamily="monospace"
          fontSize="16px"
          p={6}
          _hover={{ bg: "#1D4ED8" }}
          onClick={addQuestion}
        >
          ➕ AGREGAR PREGUNTA
        </Button>

        {/* Save Button */}
        <Button
          bg="#22C55E"
          color="white"
          border="2px solid #16A34A"
          borderRadius="0"
          fontFamily="monospace"
          fontSize="18px"
          p={8}
          w="200px"
          _hover={{ bg: "#16A34A" }}
          onClick={saveQuiz}
        >
          💾 GUARDAR QUIZ
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateActivity;
