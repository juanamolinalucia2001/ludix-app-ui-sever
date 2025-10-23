import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  time_limit?: number;
  created_by: string;
  class_id: string;
}

export interface GameSession {
  id: string;
  quiz_id: string;
  student_id: string;
  current_question: number;
  score: number;
  start_time: string;
  end_time?: string;
  answers: Array<{
    question_id: string;
    selected_answer: number;
    is_correct: boolean;
    time_taken: number;
  }>;
  status: 'in_progress' | 'completed' | 'paused';
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  mascot: 'dragon' | 'unicorn' | 'robot' | 'cat' | 'dog';
}

interface GameState {
  // Current game session
  currentSession: GameSession | null;
  currentQuiz: Quiz | null;
  timeRemaining: number;
  
  // Student profile
  studentProfile: StudentProfile | null;
  
  // UI state
  isGameActive: boolean;
  showResults: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Available quizzes
  availableQuizzes: Quiz[];
}

interface GameActions {
  // Game session management
  startGame: (quizId: string) => Promise<void>;
  submitAnswer: (questionId: string, answer: number) => Promise<void>;
  endGame: () => Promise<void>;
  pauseGame: () => void;
  resumeGame: () => void;
  
  // Student profile
  createStudentProfile: (name: string, mascot: StudentProfile['mascot']) => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  
  // Quiz management
  loadAvailableQuizzes: (classId: string) => Promise<void>;
  
  // Timer
  updateTimer: (seconds: number) => void;
  
  // UI actions
  clearError: () => void;
  resetGameState: () => void;
}

// Factory Pattern: Create Game Store
const createGameStore = () => {
  return create<GameState & GameActions>()(
    devtools(
      (set, get) => ({
        // Initial State
        currentSession: null,
        currentQuiz: null,
        timeRemaining: 0,
        studentProfile: null,
        isGameActive: false,
        showResults: false,
        isLoading: false,
        error: null,
        availableQuizzes: [],

        // Actions
        startGame: async (quizId: string) => {
          set({ isLoading: true, error: null });
          
          try {
            // This would call the API to start a game session
            // For now, we'll simulate it
            const quiz = get().availableQuizzes.find(q => q.id === quizId);
            if (!quiz) throw new Error('Quiz not found');

            const newSession: GameSession = {
              id: `session_${Date.now()}`,
              quiz_id: quizId,
              student_id: get().studentProfile?.id || 'temp_student',
              current_question: 0,
              score: 0,
              start_time: new Date().toISOString(),
              answers: [],
              status: 'in_progress'
            };

            set({
              currentSession: newSession,
              currentQuiz: quiz,
              timeRemaining: quiz.time_limit || 600, // 10 minutes default
              isGameActive: true,
              isLoading: false,
              showResults: false
            });
          } catch (error) {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to start game'
            });
          }
        },

        submitAnswer: async (questionId: string, answer: number) => {
          const session = get().currentSession;
          const quiz = get().currentQuiz;
          
          if (!session || !quiz) return;

          try {
            const question = quiz.questions.find(q => q.id === questionId);
            if (!question) throw new Error('Question not found');

            const isCorrect = question.correct_answer === answer;
            const newAnswer = {
              question_id: questionId,
              selected_answer: answer,
              is_correct: isCorrect,
              time_taken: 5 // This would be calculated based on actual time
            };

            const updatedSession: GameSession = {
              ...session,
              current_question: session.current_question + 1,
              score: isCorrect ? session.score + 1 : session.score,
              answers: [...session.answers, newAnswer]
            };

            // Check if game is complete
            if (updatedSession.current_question >= quiz.questions.length) {
              updatedSession.status = 'completed';
              updatedSession.end_time = new Date().toISOString();
              set({
                currentSession: updatedSession,
                isGameActive: false,
                showResults: true
              });
            } else {
              set({ currentSession: updatedSession });
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to submit answer'
            });
          }
        },

        endGame: async () => {
          const session = get().currentSession;
          if (!session) return;

          try {
            const endedSession: GameSession = {
              ...session,
              status: 'completed',
              end_time: new Date().toISOString()
            };

            set({
              currentSession: endedSession,
              isGameActive: false,
              showResults: true
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to end game'
            });
          }
        },

        pauseGame: () => {
          const session = get().currentSession;
          if (session) {
            set({
              currentSession: { ...session, status: 'paused' },
              isGameActive: false
            });
          }
        },

        resumeGame: () => {
          const session = get().currentSession;
          if (session) {
            set({
              currentSession: { ...session, status: 'in_progress' },
              isGameActive: true
            });
          }
        },

        createStudentProfile: (name: string, mascot: StudentProfile['mascot']) => {
          const profile: StudentProfile = {
            id: `student_${Date.now()}`,
            name,
            avatar: `/avatars/${mascot}.png`,
            mascot
          };
          
          set({ studentProfile: profile });
          localStorage.setItem('ludix_student_profile', JSON.stringify(profile));
        },

        updateStudentProfile: (profileUpdates: Partial<StudentProfile>) => {
          const currentProfile = get().studentProfile;
          if (currentProfile) {
            const updatedProfile = { ...currentProfile, ...profileUpdates };
            set({ studentProfile: updatedProfile });
            localStorage.setItem('ludix_student_profile', JSON.stringify(updatedProfile));
          }
        },

        loadAvailableQuizzes: async (classId: string) => {
          set({ isLoading: true, error: null });
          
          try {
            // This would call the API to load quizzes
            // For now, we'll simulate it with mock data
            const mockQuizzes: Quiz[] = [
              {
                id: 'quiz_1',
                title: 'Matemáticas Básicas',
                description: 'Sumas y restas simples',
                questions: [
                  {
                    id: 'q1',
                    text: '¿Cuánto es 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correct_answer: 1,
                    difficulty: 'easy',
                    topic: 'matemáticas'
                  },
                  {
                    id: 'q2',
                    text: '¿Cuánto es 5 - 3?',
                    options: ['1', '2', '3', '4'],
                    correct_answer: 1,
                    difficulty: 'easy',
                    topic: 'matemáticas'
                  }
                ],
                time_limit: 300,
                created_by: 'teacher_1',
                class_id: classId
              }
            ];
            
            set({
              availableQuizzes: mockQuizzes,
              isLoading: false
            });
          } catch (error) {
            set({
              isLoading: false,
              error: error instanceof Error ? error.message : 'Failed to load quizzes'
            });
          }
        },

        updateTimer: (seconds: number) => {
          set({ timeRemaining: seconds });
          
          // Auto-end game when time runs out
          if (seconds <= 0 && get().isGameActive) {
            get().endGame();
          }
        },

        clearError: () => {
          set({ error: null });
        },

        resetGameState: () => {
          set({
            currentSession: null,
            currentQuiz: null,
            timeRemaining: 0,
            isGameActive: false,
            showResults: false,
            error: null
          });
        }
      }),
      { name: 'game-store' }
    )
  );
};

// Singleton Pattern: Export store instance
export const useGameStore = createGameStore();
