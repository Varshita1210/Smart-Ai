import { FormResponse, GroupAnalysis } from '../types';

export const MOCK_RESPONSES: FormResponse[] = [
  {
    id: 'r1',
    formId: 'hackathon-1',
    userName: 'Alex Rivera',
    userEmail: 'alex.r@example.com',
    submittedAt: '2026-05-15T10:00:00Z',
    completionTime: 145,
    emotion: 'happy',
    isSpam: false,
    answers: { 'h1': 'Alex Rivera', 'h6': 'React, Node, TypeScript', 'h8': 'Web Dev' },
    analysis: {
      sentiment: 'positive',
      personality: ['Confident', 'Technical', 'Goal-oriented'],
      confidence: 92,
      interestAreas: ['Frontend', 'System Design'],
      engagementScore: 95,
      summary: 'High-intent participant with strong React skills. Very likely to complete the project.'
    }
  },
  {
    id: 'r2',
    formId: 'hackathon-1',
    userName: 'Sam Chen',
    userEmail: 'sam.c@example.com',
    submittedAt: '2026-05-15T11:30:00Z',
    completionTime: 180,
    emotion: 'neutral',
    isSpam: false,
    answers: { 'h1': 'Sam Chen', 'h6': 'Python, PyTorch, SQL', 'h8': 'AI/ML' },
    analysis: {
      sentiment: 'neutral',
      personality: ['Analytical', 'Reserved'],
      confidence: 85,
      interestAreas: ['Data Science', 'Machine Learning'],
      engagementScore: 88,
      summary: 'Focused on AI domain. Responses are concise and clear.'
    }
  },
  {
    id: 'r3',
    formId: 'hackathon-1',
    userName: 'Jordan Lee',
    userEmail: 'j.lee@example.com',
    submittedAt: '2026-05-15T14:20:00Z',
    completionTime: 60,
    emotion: 'confused',
    isSpam: true,
    answers: { 'h1': 'asdf', 'h6': 'none', 'h8': 'other' },
    analysis: {
      sentiment: 'negative',
      personality: ['Impatient'],
      confidence: 10,
      interestAreas: ['Unknown'],
      engagementScore: 15,
      summary: 'Suspiciously fast submission with keyboard-mash responses.'
    }
  },
  {
    id: 'r4',
    formId: 'hackathon-1',
    userName: 'Priya Sharma',
    userEmail: 'priya.s@example.com',
    submittedAt: '2026-05-16T09:15:00Z',
    completionTime: 210,
    emotion: 'happy',
    isSpam: false,
    answers: { 'h1': 'Priya Sharma', 'h6': 'Solidity, Rust', 'h8': 'Blockchain' },
    analysis: {
      sentiment: 'positive',
      personality: ['Innovative', 'Curious'],
      confidence: 95,
      interestAreas: ['Web3', 'Cryptography'],
      engagementScore: 98,
      summary: 'Enthusiastic about blockchain tech. Detailed and high-quality responses.'
    }
  }
];

export const MOCK_GROUP_ANALYSIS: GroupAnalysis = {
  totalResponses: 154,
  avgSentimentScore: 82,
  commonInterests: ['Web Development', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing'],
  popularSkills: ['React', 'Python', 'Node.js', 'TypeScript', 'SQL', 'Docker'],
  personalityDistribution: {
    'Analytical': 45,
    'Creative': 30,
    'Social': 15,
    'Leader': 10
  },
  participationTrends: [
    { date: 'May 10', count: 12 },
    { date: 'May 11', count: 18 },
    { date: 'May 12', count: 45 },
    { date: 'May 13', count: 32 },
    { date: 'May 14', count: 65 },
    { date: 'May 15', count: 28 },
    { date: 'May 16', count: 15 }
  ],
  engagementHeatmap: Array.from({ length: 7 }, () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))),
  aiInsights: [
    "Peak engagement occurs around 2 PM on weekdays. Schedule your next announcement then.",
    "Web Dev is the most popular track, but AI/ML has the highest sentiment scores.",
    "20% of participants are looking for teams - consider a team-building session.",
    "Students from 3rd year show 15% higher completion speed than 1st year students."
  ]
};
