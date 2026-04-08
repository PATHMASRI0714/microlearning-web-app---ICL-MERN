// Match the exact shape needed by the frontend

const todaysLesson = {
  id: 'l101',
  topic: 'React Fundamentals',
  title: 'Understanding useEffect',
  estimatedTime: '2 min',
  xpReward: 50,
  flashcards: [
    {
      id: 'f1',
      question: 'What is the primary purpose of useEffect?',
      answer: 'To handle side effects in functional components, like data fetching or DOM subscriptions.',
    },
    {
      id: 'f2',
      question: 'When does the cleanup function in useEffect run?',
      answer: 'It runs before the component unmounts, and before the effect runs again on subsequent renders.',
    },
    {
      id: 'f3',
      question: 'What happens if you omit the dependency array?',
      answer: 'The effect runs after EVERY render.',
    }
  ]
};

const topicLessons = {
  't1': {
    id: 'tl_t1',
    topic: 'Web Development',
    title: 'CSS Flexbox Basics',
    estimatedTime: '2 min',
    xpReward: 30,
    flashcards: [
      { id: 'f1', question: 'What does justify-content do?', answer: 'Aligns flex items along the main axis.' },
      { id: 'f2', question: 'What is the default flex-direction?', answer: 'row' }
    ]
  },
  't2': {
    id: 'tl_t2',
    topic: 'Data Science',
    title: 'Pandas Fundamentals',
    estimatedTime: '3 min',
    xpReward: 40,
    flashcards: [
      { id: 'f1', question: 'What is a DataFrame in Pandas?', answer: 'A 2-dimensional labeled data structure with columns of potentially different types.' },
      { id: 'f2', question: 'How do you check for missing values?', answer: 'Using the .isnull() method.' },
      { id: 'f3', question: 'What does .head() do?', answer: 'Returns the first 5 rows of the DataFrame.' }
    ]
  },
  't3': {
    id: 'tl_t3',
    topic: 'Design Patterns',
    title: 'Singleton & Observer',
    estimatedTime: '2 min',
    xpReward: 35,
    flashcards: [
      { id: 'f1', question: 'What is a Singleton? ', answer: 'A pattern that restricts the instantiation of a class to one single instance.' },
      { id: 'f2', question: 'When should you use the Observer pattern?', answer: 'When one object changes state, and all its dependents must be notified automatically.' }
    ]
  },
  't4': {
    id: 'tl_t4',
    topic: 'Cloud Computing',
    title: 'Introduction to AWS',
    estimatedTime: '3 min',
    xpReward: 40,
    flashcards: [
      { id: 'f1', question: 'What does S3 stand for?', answer: 'Simple Storage Service' },
      { id: 'f2', question: 'What is EC2?', answer: 'Elastic Compute Cloud - virtual servers in AWS.' }
    ]
  },
  't5': {
    id: 'tl_t5',
    topic: 'Algorithms',
    title: 'Big O Notation',
    estimatedTime: '4 min',
    xpReward: 50,
    flashcards: [
      { id: 'f1', question: 'What does Big O notation describe?', answer: 'The worst-case complexity or execution time required by an algorithm.' },
      { id: 'f2', question: 'What is the time complexity of a binary search?', answer: 'O(log n)' },
      { id: 'f3', question: 'Which is faster: O(n) or O(log n)?', answer: 'O(log n) is faster and scales better for large inputs.' }
    ]
  },
  't6': {
    id: 'tl_t6',
    topic: 'System Design',
    title: 'Load Balancing',
    estimatedTime: '3 min',
    xpReward: 45,
    flashcards: [
      { id: 'f1', question: 'What is a Load Balancer?', answer: 'A device or software that distributes network or application traffic across multiple servers.' },
      { id: 'f2', question: 'What is Round Robin?', answer: 'A load balancing algorithm that distributes requests sequentially across the server pool.' },
      { id: 'f3', question: 'What does SPOF stand for?', answer: 'Single Point of Failure.' }
    ]
  }
};

const topicsGrid = [
  { id: 't1', title: 'Web Development', color: '#3b82f6', icon: 'code' },
  { id: 't2', title: 'Data Science', color: '#8b5cf6', icon: 'database' },
  { id: 't3', title: 'Design Patterns', color: '#ec4899', icon: 'layers' },
  { id: 't4', title: 'Cloud Computing', color: '#10b981', icon: 'cloud' },
  { id: 't5', title: 'Algorithms', color: '#f59e0b', icon: 'cpu' },
  { id: 't6', title: 'System Design', color: '#ef4444', icon: 'server' },
];

module.exports = { todaysLesson, topicLessons, topicsGrid };
