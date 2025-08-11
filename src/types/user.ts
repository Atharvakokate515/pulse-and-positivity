export interface UserProfile {
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  fitnessGoals: string;
}

export interface NutritionGoals {
  protein: string;
  calories: string;
  fat: string;
  carbs: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}