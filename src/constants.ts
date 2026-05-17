export const SAMPLE_FORM = {
  id: 'student-feedback-1',
  title: 'Course Experience Survey',
  description: 'Help us improve your learning journey by sharing your thoughts on the recent module.',
  questions: [
    {
      id: 'q1',
      type: 'text',
      title: 'What is your full name?',
      required: true
    },
    {
      id: 'q2',
      type: 'rating',
      title: 'How would you rate your overall experience?',
      description: '1 is poor, 5 is excellent',
      required: true
    },
    {
      id: 'q3',
      type: 'text',
      title: 'What did you enjoy most about this subject?',
      required: false
    },
    {
      id: 'q4',
      type: 'text',
      title: 'Any suggestions for improvement?',
      required: false
    },
    {
      id: 'q5',
      type: 'yes-no',
      title: 'Would you recommend this course to a friend?',
      required: true
    }
  ]
};

export const MOCK_STATS = [
  { label: 'Completion Rate', value: '84%', icon: 'Percent' },
  { label: 'Avg. Rating', value: '4.8', icon: 'Star' },
  { label: 'Avg. Fill Time', value: '2.5m', icon: 'Clock' },
  { label: 'Responses', value: '1,284', icon: 'Users' }
];

export const COMPARISON_DATA = [
  { feature: 'Primary Goal', google: 'Collects answers only', pulse: 'Understands user behavior' },
  { feature: 'Intelligence', google: 'No intelligence', pulse: 'Predicts problems & fatigue' },
  { feature: 'Insights', google: 'Static charts', pulse: 'Actionable recommendations' },
  { feature: 'Spam Control', google: 'Manual filtering', pulse: 'AI-powered auto-detection' },
  { feature: 'UX Guidance', google: 'None', pulse: 'Real-time fatigue alerts' }
];
