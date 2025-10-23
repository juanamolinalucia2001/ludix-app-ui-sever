// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8001',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      GOOGLE_LOGIN: '/auth/google',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    },
    USERS: {
      PROFILE: '/users/profile',
      STUDENTS: '/users/students',
      TEACHER_DASHBOARD: '/users/teacher/dashboard'
    },
    CLASSES: {
      CREATE: '/classes',
      LIST: '/classes',
      JOIN: '/classes/join',
      STUDENTS: '/classes/{id}/students'
    },
    GAMES: {
      LIST: '/games',
      CREATE: '/games',
      START_SESSION: '/games/{id}/start',
      SUBMIT_ANSWER: '/games/sessions/{id}/answer',
      GET_RESULTS: '/games/sessions/{id}/results'
    },
    CONTENT: {
      TEXTS: '/content/texts',
      QUESTIONS: '/content/questions',
      UPLOAD: '/content/upload'
    },
    PROGRESS: {
      STUDENT: '/progress/student/{id}',
      CLASS: '/progress/class/{id}',
      METRICS: '/progress/metrics'
    }
  }
} as const;

// Request timeout
export const REQUEST_TIMEOUT = 10000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
} as const;
