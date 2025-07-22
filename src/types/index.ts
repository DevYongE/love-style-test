export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  category: 'secure' | 'anxious' | 'avoidant' | 'fearful-avoidant';
}

export interface TestResult {
  type: 'secure' | 'anxious' | 'avoidant' | 'fearful-avoidant';
  title: string;
  description: string;
  characteristics: string[];
  color: string;
  emoji: string;
}

export interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
} 