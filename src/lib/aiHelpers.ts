import { Question, QuestionType } from './types';

export const generateHackathonQuestions = (): Question[] => [
  { id: 'h1', type: 'text', title: 'Student Name', required: true },
  { id: 'h2', type: 'email', title: 'Email Address', required: true },
  { id: 'h3', type: 'text', title: 'College Name', required: true },
  { id: 'h4', type: 'multiple-choice', title: 'Branch', options: ['CS/IT', 'Electronics', 'Mechanical', 'Other'], required: true },
  { id: 'h5', type: 'multiple-choice', title: 'Year of Study', options: ['1st Year', '2nd Year', '3rd Year', '4th Year'], required: true },
  { id: 'h6', type: 'text', title: 'Skills (e.g. React, Python, UI/UX)', required: true },
  { id: 'h7', type: 'yes-no', title: 'Previous Hackathon Experience', required: true },
  { id: 'h8', type: 'multiple-choice', title: 'Preferred Domain', options: ['Web Dev', 'App Dev', 'AI/ML', 'Blockchain', 'Cloud'], required: true },
  { id: 'h9', type: 'multiple-choice', title: 'Team or Individual Participation', options: ['Individual', 'Team (Already Formed)', 'Looking for Team'], required: true },
  { id: 'h10', type: 'text', title: 'Expectations from Hackathon', required: false },
];

export const getAISuggestion = (questionTitle: string): any => {
  return {
    improvedWording: `How would you describe your ${questionTitle.toLowerCase()} level?`,
    alternatives: [
      `What is your primary ${questionTitle.toLowerCase()}?`,
      `List your top 3 ${questionTitle.toLowerCase()}.`
    ],
    suggestedValidations: ['Min 3 characters', 'No numbers allowed'],
    suggestedType: 'multiple-choice',
    followUp: `How many years of experience do you have with this?`
  };
};

export const simulateChatResponse = (prompt: string) => {
  const lower = prompt.toLowerCase();
  if (lower.includes('hackathon') || lower.includes('student')) {
    return {
      message: "I've generated a comprehensive hackathon registration form for you. It includes technical stack questions, team logistics, and personal details.",
      questions: generateHackathonQuestions()
    };
  }
  if (lower.includes('employee') || lower.includes('work')) {
    return {
      message: "Creating an employee engagement survey. I'll include questions about work-life balance, management satisfaction, and career growth.",
      questions: [
        { id: 'e1', type: 'rating', title: 'Work-Life Balance', required: true },
        { id: 'e2', type: 'rating', title: 'Management Support', required: true },
        { id: 'e3', type: 'text', title: 'What could we improve?', required: false },
      ]
    };
  }
  return {
    message: "Sure! I can help with that. Here are some smart questions for your form.",
    questions: [
      { id: 'g1', type: 'text', title: 'Name', required: true },
      { id: 'g2', type: 'rating', title: 'Overall Satisfaction', required: true },
    ]
  };
};
