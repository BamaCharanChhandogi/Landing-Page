import React from 'react';
// Removed decorative icons for a cleaner, professional dashboard
import Layout from '../components/layout/Layout';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { codingStats, recentInsights, markInsightAsRead } = useUser();

  const chartData = codingStats.codeQualityTrend.map((score, index) => ({
    day: `D${index + 1}`,
    score: score
  }));

  const languageData = Object.entries(codingStats.languageBreakdown).map(([language, percentage]) => ({
    name: language,
    value: percentage
  }));

  const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'];
  const impactToClasses = (impact: string) => (
    impact === 'high' ? 'bg-red-500/20 text-red-400' : impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass-card rounded-2xl p-6 aurora-bg border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 code-font">
                NEURAL.STATUS: <span className="gradient-text">{user?.name?.split(' ')[0]?.toUpperCase()}</span>
              </h1>
              <p className="text-zinc-400 mb-4">
                System analysis complete. Your coding evolution is accelerating.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-zinc-300 code-font">{codingStats.weeklyCommits} COMMITS.WEEK</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-zinc-300 code-font">QUALITY.SCORE: {codingStats.improvementScore}/100</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold gradient-text mb-1 code-font">{codingStats.improvementScore}</div>
              <div className="text-sm text-zinc-400 code-font">EVOLUTION.INDEX</div>
              <div className="flex items-center mt-2 text-green-400">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                <span className="text-sm code-font">+12% GROWTH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 code-font">FUNCTIONS.TOTAL</p>
                <p className="text-2xl font-bold text-white code-font">{codingStats.totalFunctions}</p>
              </div>
              <div className="text-zinc-500 text-xs code-font">WK +23</div>
            </div>
            <div className="mt-4 text-sm text-green-400 font-medium code-font">+23 THIS.WEEK</div>
          </div>

          <div className="glass-card rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 code-font">AVG.LENGTH</p>
                <p className="text-2xl font-bold text-white code-font">{codingStats.avgFunctionLength}</p>
              </div>
              <div className="text-zinc-500 text-xs code-font">LEN</div>
            </div>
            <div className="mt-4 text-sm text-green-400 font-medium code-font">-22 LINES.OPTIMIZED</div>
          </div>

          <div className="glass-card rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 code-font">ERRORS.FIXED</p>
                <p className="text-2xl font-bold text-white code-font">{codingStats.errorsFixed}</p>
              </div>
              <div className="text-zinc-500 text-xs code-font">CYCLE</div>
            </div>
            <div className="mt-4 text-sm text-zinc-400 code-font">THIS.CYCLE</div>
          </div>

          <div className="glass-card rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 code-font">COMMITS.WEEK</p>
                <p className="text-2xl font-bold text-white code-font">{codingStats.weeklyCommits}</p>
              </div>
              <div className="text-zinc-500 text-xs code-font">VELOCITY</div>
            </div>
            <div className="mt-4 text-sm text-green-400 font-medium code-font">OPTIMAL.VELOCITY</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code Quality Trend */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-zinc-800 chart-container">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white code-font">QUALITY.EVOLUTION</h3>
              <div className="flex items-center text-sm text-green-400">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                <span className="code-font">+18% TRAJECTORY</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#0891b2' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="glass-card rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6 code-font">LANGUAGE.MATRIX</h3>
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
                    {languageData.map((_, index) => (
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
                    <span className="text-zinc-300 code-font">{item.name.toUpperCase()}</span>
                  </div>
                  <span className="font-medium text-white code-font">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent AI Insights */}
        <div className="glass-card rounded-xl border border-zinc-800">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white code-font">NEURAL.INSIGHTS</h3>
              <span className="text-sm text-zinc-400 code-font">
                {recentInsights.filter(i => !i.read).length} UNPROCESSED
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentInsights.slice(0, 4).map((insight) => (
                <div 
                  key={insight.id} 
                  className={`p-4 rounded-lg border transition-all cursor-pointer holographic ${
                    insight.read 
                      ? 'border-zinc-700 bg-zinc-800/30' 
                      : 'border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10'
                  }`}
                  onClick={() => markInsightAsRead(insight.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${insight.impact === 'high' ? 'bg-red-400' : insight.impact === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                        <h4 className="font-medium text-white code-font">{insight.title}</h4>
                      </div>
                      <p className="text-sm text-zinc-400 mb-2">{insight.description}</p>
                      {insight.code && (
                        <div className="bg-black/50 text-green-400 text-xs p-3 rounded-lg code-font border border-zinc-700">
                          {insight.code}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full code-font ${impactToClasses(insight.impact)}`}>{insight.impact.toUpperCase()}</span>
                      <span className="text-xs text-zinc-500 code-font">
                        {new Date(insight.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm code-font transition-colors">
                ACCESS.ALL.INSIGHTS →
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;