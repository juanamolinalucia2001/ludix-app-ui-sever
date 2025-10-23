# Ludix App UI Server (Frontend)

Frontend de la aplicación Ludix desarrollado con React, TypeScript, Vite y Chakra UI.

## 🎯 Arquitectura y Patrones

### **Patrones de Diseño Implementados:**

#### **1. Factory Pattern**
- **Store Factory**: Creación modular de stores Zustand
- **Component Factory**: Componentes reutilizables para diferentes tipos de usuario

#### **2. Singleton Pattern**
- **API Client**: Instancia única del cliente HTTP
- **Store Instances**: Stores globales únicos de Zustand

#### **3. Observer Pattern**
- **Zustand Subscriptions**: Observación automática de cambios de estado
- **Real-time Updates**: Notificaciones de progreso en tiempo real

#### **4. Decorator Pattern**
- **API Middleware**: Logging y autenticación automática
- **Store Middleware**: Persistencia y DevTools

## 🏗️ Estructura del Proyecto

```
src/
├── api/
│   ├── config.ts           # Configuración de API
│   └── AuthService.ts      # Servicio de autenticación (Singleton + Decorator)
├── stores/
│   ├── authStore.ts        # Store de autenticación (Factory + Observer)
│   └── gameStore.ts        # Store de juegos (Factory + Observer)
├── pages/
│   ├── LoginPage.tsx       # Página de login
│   ├── StudentDashboard.tsx # Dashboard del estudiante
│   ├── TeacherDashboard.tsx # Dashboard del docente
│   ├── GamePage.tsx        # Página de juego
│   └── ProfileSetupPage.tsx # Configuración de perfil
├── App.tsx                 # Router principal
└── main.tsx               # ChakraProvider setup
```

## 🎮 Funcionalidades Principales

### **Para Estudiantes:**
- 👤 Creación de perfil con mascota personalizada
- 🎯 Dashboard con juegos disponibles
- 🎮 Interfaz de juego interactiva
- 📊 Progreso y estadísticas personales
- 🏆 Sistema de recompensas

### **Para Docentes:**
- 📋 Panel de administración completo
- 👨‍🎓 Lista y progreso de estudiantes
- 📊 Métricas de clase en tiempo real
- 📝 Creación de contenido (próximamente)
- 📈 Reportes detallados