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
