export interface Subject {
  id: number;
  title: string;
  stages_count: number;
  description: string;
  image: string;
  is_active: boolean;
  created_at: string;
}

export interface IncompleteLesson {
  lesson_id: number;
  title: string;
  completedStage: number;
  totalStage: number;
}

export interface Certificate {
  id: number;
  subject: number;
  issued_at: string;
  subject_detail: {
    title: string;
    description: string;
  };
}

export interface LessonStage {
  id: number;
  subject: number;
  title: string;
  order: number;
  content: string;
  pass_score: number;
  xp_reward: number;
  is_active: boolean;
  created_at: string;
  is_locked: boolean;
  is_passed: boolean;
}

export interface Option {
  id: number;
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: number;
  title: string;
  type: "multiple-choice";
  order: number;
  options: Option[];
}

export interface ApiResponse {
  is_passed: boolean;
  score: number;
  total_questions: number;
  xp_gained: number;
  current_streak: number;
  current_level: number;
}

export interface UserMinimal {
  id: number;
  username: string;
}

export interface ContestData {
  id: number;
  creator_username: string;
  opponent_username: string | null;
  status: "waiting" | "playing" | "finished";
  creator_score: number;
  opponent_score: number;
  creator_submitted: boolean;
  opponent_submitted: boolean;
  winner: UserMinimal | null;
  is_draw: boolean;
  questions: Question[];
}

export interface ContestResponse {
  message: string;
  contest: ContestData;
}
