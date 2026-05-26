export interface IslandGroup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  majorProvinces: string[];
  nativeLanguages: string[];
  climate: string;
  destinations: Destination[];
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  islandGroup: 'Luzon' | 'Visayas' | 'Mindanao';
  description: string;
  funFact: string;
  tags: string[];
  bestTime: string;
  activities: string[];
  imageUrl?: string;
}

export interface Dish {
  id: string;
  name: string;
  originalName?: string;
  pronunciation: string;
  islandGroupOrigin: 'Luzon' | 'Visayas' | 'Mindanao' | 'Nationwide';
  flavorProfile: string[];
  mainIngredients: string[];
  description: string;
  historyAndCulture: string;
  cookingStyle: string; // Brief description of prep
  imageUrl?: string;
}

export interface Phrase {
  id: string;
  english: string;
  tagalog: string;
  cebuano: string;
  ilocano: string;
  context: 'greetings' | 'dining' | 'travel' | 'shopping';
  pronunciationTip: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
