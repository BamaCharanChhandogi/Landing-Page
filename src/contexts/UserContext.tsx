import React, { createContext, useContext, useState, useEffect } from 'react';

interface CodingStats {
  totalFunctions: number;
  avgFunctionLength: number;
  errorsFixed: number;
  improvementScore: number;
  weeklyCommits: number;
  codeQualityTrend: number[];
  languageBreakdown: { [key: string]: number };
  dailyActivity: { date: string; commits: number; functions: number }[];
}

interface AIInsight {
  id: string;
  type: 'improvement' | 'achievement' | 'suggestion' | 'warning';
  title: string;
  description: string;
  code?: string;
  impact: 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
}

interface UserContextType {
  codingStats: CodingStats;
  recentInsights: AIInsight[];
  weeklyReport: any;
  loading: boolean;
  markInsightAsRead: (id: string) => void;
  refreshStats: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [codingStats, setCodingStats] = useState<CodingStats>({
    totalFunctions: 127,
    avgFunctionLength: 45,
    errorsFixed: 23,
    improvementScore: 78,
    weeklyCommits: 18,
    codeQualityTrend: [65, 68, 72, 75, 78, 81, 78],
    languageBreakdown: {
      JavaScript: 45,
      TypeScript: 30,
      React: 20,
      Node: 5
    },
    dailyActivity: [
      { date: '2025-01-15', commits: 3, functions: 8 },
      { date: '2025-01-16', commits: 5, functions: 12 },
      { date: '2025-01-17', commits: 2, functions: 6 },
      { date: '2025-01-18', commits: 4, functions: 10 },
      { date: '2025-01-19', commits: 3, functions: 7 },
      { date: '2025-01-20', commits: 1, functions: 4 },
      { date: '2025-01-21', commits: 0, functions: 0 }
    ]
  });

  const [recentInsights, setRecentInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'achievement',
      title: 'Function Length Improved!',
      description: 'Your average function length decreased from 67 to 45 lines. Great modular thinking!',
      impact: 'high',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Consider Optional Chaining',
      description: 'I noticed 3 instances where optional chaining could prevent potential errors.',
      code: 'user?.profile?.name instead of user.profile.name',
      impact: 'medium',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'improvement',
      title: 'Async Pattern Recognition',
      description: 'You\'re mastering async/await! 95% consistency in your recent commits.',
      impact: 'high',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '4',
      type: 'warning',
      title: 'Potential Memory Leak',
      description: 'Event listener not properly cleaned up in useEffect hook.',
      code: 'return () => element.removeEventListener(...)',
      impact: 'high',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      read: false
    }
  ]);

  const weeklyReport = {
    period: 'Jan 15 - Jan 21, 2025',
    summary: 'Strong week with consistent improvement patterns',
    highlights: [
      '18 commits with clean, focused changes',
      'Function modularity improved by 32%',
      'Zero critical errors introduced',
      'Async patterns show mastery level'
    ],
    nextWeekGoals: [
      'Practice TypeScript utility types',
      'Implement error boundary pattern',
      'Focus on component composition'
    ]
  };

  useEffect(() => {
    // Simulate loading user data
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };
    loadData();
  }, []);

  const markInsightAsRead = (id: string) => {
    setRecentInsights(insights => 
      insights.map(insight => 
        insight.id === id ? { ...insight, read: true } : insight
      )
    );
  };

  const refreshStats = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{
      codingStats,
      recentInsights,
      weeklyReport,
      loading,
      markInsightAsRead,
      refreshStats
    }}>
      {children}
    </UserContext.Provider>
  );
};