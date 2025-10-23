import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { useAuthStore } from './stores/authStore';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import GamePage from './pages/GamePage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import CreateActivity from './pages/CreateActivity';
import TestAPI from './pages/TestAPI';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'teacher' | 'student';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Student Route - requires profile setup
const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const studentProfile = localStorage.getItem('ludix_student_profile');
  
  if (!studentProfile) {
    return <Navigate to="/setup-profile" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Box minH="100vh" bg="gradient(to-br, #667eea 0%, #764ba2 100%)">
      <Routes>
        {/* Test Route */}
        <Route 
          path="/test" 
          element={<TestAPI />} 
        />
        
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to={user?.role === 'teacher' ? '/teacher' : '/student'} replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        
        {/* Student Routes */}
        <Route 
          path="/setup-profile" 
          element={
            <ProtectedRoute requiredRole="student">
              <ProfileSetupPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/student" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentRoute>
                <StudentDashboard />
              </StudentRoute>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/game/:quizId" 
          element={
            <ProtectedRoute requiredRole="student">
              <StudentRoute>
                <GamePage />
              </StudentRoute>
            </ProtectedRoute>
          } 
        />
        
        {/* Teacher Routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/create-activity" 
          element={
            <ProtectedRoute requiredRole="teacher">
              <CreateActivity />
            </ProtectedRoute>
          } 
        />
        
        {/* Default Route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={user?.role === 'teacher' ? '/teacher' : '/student'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* 404 Route */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Box>
  );
};

export default App;
