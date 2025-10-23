import { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Divider
} from '@chakra-ui/react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { login, register, isLoading, error, clearError } = useAuthStore();

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    role: 'student' as 'teacher' | 'student' 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await login(loginForm.email, loginForm.password);
      toast({
        title: '¡Bienvenido!',
        description: 'Has iniciado sesión correctamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await register(
        registerForm.email, 
        registerForm.password, 
        registerForm.name, 
        registerForm.role
      );
      toast({
        title: '¡Cuenta creada!',
        description: 'Tu cuenta ha sido creada exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    // This would integrate with Google OAuth
    // For now, we'll simulate it
    try {
      toast({
        title: 'Google Login',
        description: 'Funcionalidad próximamente disponible',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bgGradient="linear(135deg, #00d4ff 0%, #090979 35%, #020024 100%)"
      p={4}
      position="relative"
      overflow="hidden"
    >
      {/* Roblox-style background elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        width="60px"
        height="60px"
        bg="#ff6b6b"
        transform="rotate(45deg)"
        opacity={0.1}
      />
      <Box
        position="absolute"
        top="20%"
        right="15%"
        width="40px"
        height="40px"
        bg="#4ecdc4"
        borderRadius="8px"
        opacity={0.1}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="20%"
        width="50px"
        height="50px"
        bg="#45b7d1"
        opacity={0.1}
      />

      <Card 
        maxW="450px" 
        w="full" 
        shadow="0 8px 32px rgba(0, 0, 0, 0.3)"
        borderRadius="16px"
        border="3px solid"
        borderColor="#00d4ff"
        bg="white"
        overflow="hidden"
      >
        <CardHeader 
          textAlign="center" 
          pb={2}
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          position="relative"
        >
          <VStack spacing={3}>
            {/* Roblox-style logo */}
            <Box 
              width="100px" 
              height="100px" 
              bg="white"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#667eea"
              fontSize="3xl"
              fontWeight="black"
              fontFamily="'Fredoka One', cursive"
              border="4px solid #00d4ff"
              shadow="0 4px 16px rgba(0, 0, 0, 0.2)"
              transform="rotate(-5deg)"
              transition="all 0.3s ease"
              _hover={{
                transform: "rotate(0deg) scale(1.05)",
                shadow: "0 6px 20px rgba(0, 0, 0, 0.3)"
              }}
            >
              🎮
            </Box>
            <Heading 
              size="xl" 
              color="white"
              fontFamily="'Fredoka One', cursive"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
              fontSize="2.5rem"
            >
              LUDIX
            </Heading>
            <Text 
              color="white" 
              fontSize="lg"
              fontWeight="bold"
              textShadow="1px 1px 2px rgba(0, 0, 0, 0.3)"
            >
              ¡Únete a la aventura educativa!
            </Text>
          </VStack>
        </CardHeader>

        <CardBody p={6}>
          {error && (
            <Alert 
              status="error" 
              borderRadius="12px" 
              mb={4}
              border="2px solid #ff6b6b"
              bg="#fff5f5"
            >
              <AlertIcon color="#ff6b6b" />
              <Text fontWeight="bold" color="#ff6b6b">{error}</Text>
            </Alert>
          )}

          <Tabs 
            isFitted 
            variant="enclosed" 
            colorScheme="blue"
            bg="transparent"
          >
            <TabList 
              mb={6}
              border="none"
              bg="linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 100%)"
              borderRadius="12px"
              p={1}
            >
              <Tab
                borderRadius="10px"
                fontWeight="bold"
                fontSize="lg"
                _selected={{
                  bg: "linear-gradient(135deg, #00d4ff 0%, #667eea 100%)",
                  color: "white",
                  shadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
                }}
                _hover={{
                  bg: "rgba(102, 126, 234, 0.1)"
                }}
              >
                🔑 INICIAR SESIÓN
              </Tab>
              <Tab
                borderRadius="10px"
                fontWeight="bold"
                fontSize="lg"
                _selected={{
                  bg: "linear-gradient(135deg, #00d4ff 0%, #667eea 100%)",
                  color: "white",
                  shadow: "0 4px 12px rgba(102, 126, 234, 0.4)"
                }}
                _hover={{
                  bg: "rgba(102, 126, 234, 0.1)"
                }}
              >
                ⭐ REGISTRARSE
              </Tab>
            </TabList>

            <TabPanels>
              {/* Login Panel */}
              <TabPanel p={0}>
                <form onSubmit={handleLogin}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                      >
                        📧 Email
                      </FormLabel>
                      <Input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="tu@email.com"
                        size="lg"
                        borderRadius="12px"
                        border="3px solid #e2e8f0"
                        bg="white"
                        fontSize="lg"
                        _focus={{
                          borderColor: "#00d4ff",
                          shadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
                          bg: "#f7fafc"
                        }}
                        _hover={{
                          borderColor: "#00d4ff"
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                      >
                        🔒 Contraseña
                      </FormLabel>
                      <Input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        size="lg"
                        borderRadius="12px"
                        border="3px solid #e2e8f0"
                        bg="white"
                        fontSize="lg"
                        _focus={{
                          borderColor: "#00d4ff",
                          shadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
                          bg: "#f7fafc"
                        }}
                        _hover={{
                          borderColor: "#00d4ff"
                        }}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      w="full"
                      isLoading={isLoading}
                      loadingText="🎮 Cargando..."
                      borderRadius="12px"
                      bg="linear-gradient(135deg, #00d4ff 0%, #667eea 100%)"
                      color="white"
                      fontSize="xl"
                      fontWeight="black"
                      h="60px"
                      border="3px solid #00d4ff"
                      shadow="0 6px 20px rgba(0, 212, 255, 0.4)"
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "0 8px 25px rgba(0, 212, 255, 0.5)"
                      }}
                      _active={{
                        transform: "translateY(0px)"
                      }}
                    >
                      🚀 ENTRAR A LUDIX
                    </Button>
                  </VStack>
                </form>

                <Divider my={6} borderColor="#e2e8f0" borderWidth="2px" />

                <VStack spacing={4}>
                  <Text fontSize="lg" color="#667eea" fontWeight="bold">
                    🎯 O elige tu aventura:
                  </Text>
                  <HStack spacing={4} w="full">
                    <Button
                      variant="outline"
                      flex={1}
                      onClick={handleGoogleLogin}
                      borderRadius="12px"
                      border="3px solid #48bb78"
                      color="#48bb78"
                      bg="white"
                      fontSize="lg"
                      fontWeight="bold"
                      h="50px"
                      _hover={{
                        bg: "#48bb78",
                        color: "white",
                        transform: "translateY(-2px)",
                        shadow: "0 6px 16px rgba(72, 187, 120, 0.4)"
                      }}
                    >
                      👨‍🎓 Estudiante
                    </Button>
                    <Button
                      variant="outline"
                      flex={1}
                      onClick={handleGoogleLogin}
                      borderRadius="12px"
                      border="3px solid #9f7aea"
                      color="#9f7aea"
                      bg="white"
                      fontSize="lg"
                      fontWeight="bold"
                      h="50px"
                      _hover={{
                        bg: "#9f7aea",
                        color: "white",
                        transform: "translateY(-2px)",
                        shadow: "0 6px 16px rgba(159, 122, 234, 0.4)"
                      }}
                    >
                      👩‍🏫 Docente
                    </Button>
                  </HStack>
                </VStack>
              </TabPanel>

              {/* Register Panel */}
              <TabPanel p={0}>
                <form onSubmit={handleRegister}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                      >
                        👤 Nombre completo
                      </FormLabel>
                      <Input
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        placeholder="Tu nombre completo"
                        size="lg"
                        borderRadius="12px"
                        border="3px solid #e2e8f0"
                        bg="white"
                        fontSize="lg"
                        _focus={{
                          borderColor: "#00d4ff",
                          shadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
                          bg: "#f7fafc"
                        }}
                        _hover={{
                          borderColor: "#00d4ff"
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                      >
                        📧 Email
                      </FormLabel>
                      <Input
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="tu@email.com"
                        size="lg"
                        borderRadius="12px"
                        border="3px solid #e2e8f0"
                        bg="white"
                        fontSize="lg"
                        _focus={{
                          borderColor: "#00d4ff",
                          shadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
                          bg: "#f7fafc"
                        }}
                        _hover={{
                          borderColor: "#00d4ff"
                        }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                      >
                        🔒 Contraseña
                      </FormLabel>
                      <Input
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="••••••••"
                        size="lg"
                        borderRadius="12px"
                        border="3px solid #e2e8f0"
                        bg="white"
                        fontSize="lg"
                        _focus={{
                          borderColor: "#00d4ff",
                          shadow: "0 0 0 3px rgba(0, 212, 255, 0.1)",
                          bg: "#f7fafc"
                        }}
                        _hover={{
                          borderColor: "#00d4ff"
                        }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel 
                        fontWeight="bold" 
                        color="#667eea"
                        fontSize="lg"
                        mb={3}
                      >
                        🎯 Tipo de cuenta
                      </FormLabel>
                      <HStack spacing={4} w="full">
                        <Button
                          variant={registerForm.role === 'student' ? 'solid' : 'outline'}
                          flex={1}
                          onClick={() => setRegisterForm({ ...registerForm, role: 'student' })}
                          borderRadius="12px"
                          border="3px solid #48bb78"
                          bg={registerForm.role === 'student' ? '#48bb78' : 'white'}
                          color={registerForm.role === 'student' ? 'white' : '#48bb78'}
                          fontSize="lg"
                          fontWeight="bold"
                          h="55px"
                          _hover={{
                            bg: '#48bb78',
                            color: 'white',
                            transform: "translateY(-2px)",
                            shadow: "0 6px 16px rgba(72, 187, 120, 0.4)"
                          }}
                        >
                          👨‍🎓 Estudiante
                        </Button>
                        <Button
                          variant={registerForm.role === 'teacher' ? 'solid' : 'outline'}
                          flex={1}
                          onClick={() => setRegisterForm({ ...registerForm, role: 'teacher' })}
                          borderRadius="12px"
                          border="3px solid #9f7aea"
                          bg={registerForm.role === 'teacher' ? '#9f7aea' : 'white'}
                          color={registerForm.role === 'teacher' ? 'white' : '#9f7aea'}
                          fontSize="lg"
                          fontWeight="bold"
                          h="55px"
                          _hover={{
                            bg: '#9f7aea',
                            color: 'white',
                            transform: "translateY(-2px)",
                            shadow: "0 6px 16px rgba(159, 122, 234, 0.4)"
                          }}
                        >
                          👩‍🏫 Docente
                        </Button>
                      </HStack>
                    </FormControl>

                    <Button
                      type="submit"
                      size="lg"
                      w="full"
                      isLoading={isLoading}
                      loadingText="🎮 Creando cuenta..."
                      borderRadius="12px"
                      bg="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                      color="white"
                      fontSize="xl"
                      fontWeight="black"
                      h="60px"
                      border="3px solid #48bb78"
                      shadow="0 6px 20px rgba(72, 187, 120, 0.4)"
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "0 8px 25px rgba(72, 187, 120, 0.5)"
                      }}
                      _active={{
                        transform: "translateY(0px)"
                      }}
                    >
                      ⭐ CREAR CUENTA EN LUDIX
                    </Button>
                  </VStack>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  );
};

export default LoginPage;
