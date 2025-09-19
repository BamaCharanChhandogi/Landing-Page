import React from 'react';
import { 
  TrendingUp, 
  Code, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { codingStats, recentInsights, weeklyReport, loading, markInsightAsRead } = useUser();

  const chartData = codingStats.codeQualityTrend.map((score, index) => ({
    day: `Day ${index + 1}`,
    score: score
  }));

  const languageData = Object.entries(codingStats.languageBreakdown).map(([language, percentage]) => ({
    name: language,
    value: percentage
  }));

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'suggestion':
        return <Target className="w-5 h-5 text-blue-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Good morning, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-blue-100 mb-4">
                Here's your coding progress for this week. Keep up the great work!
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span>{codingStats.weeklyCommits} commits this week</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span>Quality score: {codingStats.improvementScore}/100</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{codingStats.improvementScore}</div>
              <div className="text-sm text-blue-200">Improvement Score</div>
              <div className="flex items-center mt-2 text-green-300">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Functions</p>
                <p className="text-2xl font-bold text-gray-900">{codingStats.totalFunctions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+23 this week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Function Length</p>
                <p className="text-2xl font-bold text-gray-900">{codingStats.avgFunctionLength}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowDown className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">-22 lines (better!)</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors Fixed</p>
                <p className="text-2xl font-bold text-gray-900">{codingStats.errorsFixed}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-gray-600">This week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Commits</p>
                <p className="text-2xl font-bold text-gray-900">{codingStats.weeklyCommits}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">Great pace!</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Quality Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Code Quality Trend</h3>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+18% this week</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#1D4ED8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Language Usage</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {languageData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent AI Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent AI Insights</h3>
              <span className="text-sm text-gray-500">
                {recentInsights.filter(i => !i.read).length} unread
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentInsights.slice(0, 4).map((insight) => (
                <div 
                  key={insight.id} 
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    insight.read 
                      ? 'border-gray-100 bg-gray-50' 
                      : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => markInsightAsRead(insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                        {insight.code && (
                          <div className="bg-gray-900 text-green-400 text-xs p-2 rounded font-mono">
                            {insight.code}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight.impact === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : insight.impact === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(insight.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View All Insights →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;