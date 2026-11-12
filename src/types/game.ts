export type AppScreen =
  | 'WELCOME'
  | 'MAP_MENU'
  | 'MISSION_DETAIL'
  | 'GAME_TEBAK_GAMBAR'
  | 'GAME_PASANGKAN'
  | 'GAME_LINI_MASA'
  | 'GAME_PENJAGA_BUDAYA'
  | 'QUIZ_EVALUASI'
  | 'FINAL_RESULT';

export interface Badge {
  id: string;
  name: string;
  missionNumber: number;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerProfile {
  name: string;
  avatar: string;
  score: number;
  completedMissions: number[]; // e.g. [1, 2]
  completedGames: string[]; // e.g. ['tebak_gambar', 'pasangkan']
  badges: Badge[];
  quizAnswers: Record<number, number>; // questionId -> selectedOptionIndex
  quizScore: number;
  reflectionAnswers: Record<string, number>; // statementId -> rating (1-4)
}

export interface QuizQuestion {
  id: number;
  category: 'Sejarah Daerah' | 'Warisan Budaya' | 'Manfaat Belajar Sejarah' | 'Pelestarian Budaya';
  difficulty: 'Mudah' | 'Sedang' | 'HOTS';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface MatchingItem {
  id: string;
  leftText: string;
  leftSub: string;
  rightText: string;
  rightSub: string;
  category: string;
}

export interface TimelineEvent {
  id: string;
  yearOrEra: string;
  title: string;
  description: string;
  correctOrder: number;
}

export interface StewardshipScenario {
  id: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  educationalMoral: string;
}

export interface ImageGuessItem {
  id: string;
  imageSrc: string;
  fallbackIcon: string;
  titlePrompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
