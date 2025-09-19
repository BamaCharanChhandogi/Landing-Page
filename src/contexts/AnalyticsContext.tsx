import React, { createContext, useContext, useState } from 'react';

interface BenchmarkData {
  category: string;
  userScore: number;
  averageScore: number;
  percentile: number;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skillLevel: string;
  improvementScore: number;
  recentActivity: string;
}

interface AnalyticsContextType {
  benchmarks: BenchmarkData[];
  teamMembers: TeamMember[];
  globalStats: {
    totalDevelopers: number;
    averageImprovement: number;
    topLanguages: string[];
  };
  loading: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading] = useState(false);

  const benchmarks: BenchmarkData[] = [
    {
      category: 'Function Length',
      userScore: 45,
      averageScore: 67,
      percentile: 78
    },
    {
      category: 'Error Handling',
      userScore: 85,
      averageScore: 72,
      percentile: 82
    },
    {
      category: 'Code Modularity',
      userScore: 73,
      averageScore: 68,
      percentile: 65
    },
    {
      category: 'Async Patterns',
      userScore: 92,
      averageScore: 75,
      percentile: 95
    },
    {
      category: 'Testing Coverage',
      userScore: 58,
      averageScore: 61,
      percentile: 45
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      skillLevel: 'Senior',
      improvementScore: 85,
      recentActivity: 'Improved error handling patterns'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      skillLevel: 'Mid',
      improvementScore: 72,
      recentActivity: 'Mastering async/await patterns'
    },
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      skillLevel: 'Beginner',
      improvementScore: 68,
      recentActivity: 'Learning TypeScript fundamentals'
    }
  ];

  const globalStats = {
    totalDevelopers: 12847,
    averageImprovement: 23,
    topLanguages: ['JavaScript', 'Python', 'TypeScript', 'Java', 'Go']
  };

  return (
    <AnalyticsContext.Provider value={{
      benchmarks,
      teamMembers,
      globalStats,
      loading
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};