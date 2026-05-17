export type QuestionType = 'text' | 'multiple-choice' | 'rating' | 'yes-no' | 'email' | 'checkbox';

export interface AISuggestion {
  improvedWording: string;
  alternatives: string[];
  suggestedValidations: string[];
  suggestedType: QuestionType;
  followUp: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options?: string[];
  required: boolean;
  aiSuggestion?: AISuggestion;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  responsesCount: number;
  status: 'active' | 'closed';
  shareUrl: string;
}

export interface ResponseAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  personality: string[];
  confidence: number;
  interestAreas: string[];
  engagementScore: number;
  summary: string;
  isSpam: boolean;
  spamRisk: number;
}

export interface FormResponse {
  id: string;
  formId: string;
  userName: string;
  userEmail: string;
  answers: { [questionId: string]: any };
  submittedAt: string;
  emotion?: 'happy' | 'confused' | 'frustrated' | 'neutral';
  isSpam: boolean;
  completionTime: number;
  analysis: ResponseAnalysis;
}

export interface GroupAnalysis {
  totalResponses: number;
  avgSentimentScore: number;
  commonInterests: string[];
  popularSkills: string[];
  personalityDistribution: { [key: string]: number };
  participationTrends: { date: string, count: number }[];
  engagementHeatmap: number[][];
  aiInsights: string[];
}

export type Page = 'landing' | 'create' | 'fill' | 'dashboard' | 'analysis' | 'responses' | 'insights' | 'spam' | 'saved-forms' | 'templates' | 'template-preview';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'plain' | 'designed';
  image: string;
  questions: Question[];
  theme?: {
    primaryColor: string;
    accentColor: string;
    bannerImage: string;
    bgGradient: string;
  };
}
