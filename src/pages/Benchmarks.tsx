import React from 'react';
import Layout from '../components/layout/Layout';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { TrendingUp, Users, Globe, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Benchmarks: React.FC = () => {
  const { benchmarks, globalStats } = useAnalytics();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Benchmarks</h1>
          <p className="text-gray-600 mt-1">Compare your coding skills with developers worldwide</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Developers</p>
                <p className="text-2xl font-bold text-gray-900">{globalStats.totalDevelopers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Participating in benchmarks</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Improvement</p>
                <p className="text-2xl font-bold text-gray-900">{globalStats.averageImprovement}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Monthly skill improvement</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Language</p>
                <p className="text-2xl font-bold text-gray-900">{globalStats.topLanguages[0]}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Most used globally</p>
          </div>
        </div>

        {/* Your Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Your Performance vs Global Average</h3>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#6b7280" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Bar dataKey="averageScore" fill="#E5E7EB" name="Global Average" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="userScore" fill="#3B82F6" name="Your Score" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Global Average</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Your Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Performance Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benchmarks.map((benchmark, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{benchmark.category}</h4>
                    <div className="flex items-center">
                      <Award className={`w-4 h-4 mr-1 ${
                        benchmark.percentile >= 80 ? 'text-yellow-500' :
                        benchmark.percentile >= 60 ? 'text-gray-400' :
                        'text-orange-400'
                      }`} />
                      <span className="text-sm font-medium text-gray-600">
                        {benchmark.percentile}th percentile
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Your Score</span>
                      <span className="font-medium text-gray-900">{benchmark.userScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Global Average</span>
                      <span className="font-medium text-gray-900">{benchmark.averageScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(benchmark.userScore / Math.max(benchmark.userScore, benchmark.averageScore, 100)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className={`mt-3 text-xs font-medium ${
                    benchmark.userScore > benchmark.averageScore 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {benchmark.userScore > benchmark.averageScore 
                      ? `+${benchmark.userScore - benchmark.averageScore} above average`
                      : `${benchmark.averageScore - benchmark.userScore} below average`
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• You're excelling in <strong>Async Patterns</strong> (95th percentile) - consider mentoring others!</p>
                <p>• <strong>Testing Coverage</strong> needs attention - you're below average. Focus here next week.</p>
                <p>• Your <strong>Function Length</strong> improvement puts you in the top 25% of developers.</p>
                <p>• Keep up the momentum with <strong>Error Handling</strong> - you're trending upward!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Benchmarks;