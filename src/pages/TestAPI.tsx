import { useState } from 'react';
import { Box, Button, VStack, Text, Code, Alert, AlertIcon } from '@chakra-ui/react';

const TestAPI = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('');
    
    try {
      // Test basic connection
      const response = await fetch('http://localhost:8001/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.text();
        setResult(`✅ Conexión exitosa: ${data}`);
      } else {
        setResult(`❌ Error de conexión: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setResult(`❌ Error de red: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('http://localhost:8001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'docente@ludix.com',
          password: '123456'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`✅ Login exitoso: Usuario ${data.user.name}`);
      } else {
        const errorData = await response.text();
        setResult(`❌ Error de login: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      setResult(`❌ Error de red: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">Test de Conexión API</Text>
        
        <VStack spacing={4} w="full">
          <Button 
            onClick={testConnection}
            isLoading={loading}
            colorScheme="blue"
            w="full"
          >
            Probar Conexión Base
          </Button>
          
          <Button 
            onClick={testLogin}
            isLoading={loading}
            colorScheme="green"
            w="full"
          >
            Probar Login
          </Button>
        </VStack>
        
        {result && (
          <Alert status={result.includes('✅') ? 'success' : 'error'}>
            <AlertIcon />
            <Code>{result}</Code>
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default TestAPI;
