import React from 'react';
import Layout from '../components/layout/Layout';
import { useAnalytics } from '../contexts/AnalyticsContext';
// Removed decorative icons for a cleaner, less "AI-generated" aesthetic
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Benchmarks: React.FC = () => {
  const { benchmarks, globalStats } = useAnalytics();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white code-font">Global Benchmarks</h1>
          <p className="text-zinc-400 mt-1">Compare your coding skills with developers worldwide</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            label:'Total Developers', value: globalStats.totalDevelopers.toLocaleString(), caption:'Participating in benchmarks'
          },{
            label:'Avg Improvement', value: `${globalStats.averageImprovement}%`, caption:'Monthly skill improvement'
          },{
            label:'Top Language', value: globalStats.topLanguages[0], caption:'Most used globally'
          }].map((card) => (
            <div key={card.label} className="glass-card rounded-2xl p-6 border border-zinc-800">
              <p className="text-sm font-medium text-zinc-400">{card.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              <p className="text-xs text-zinc-500 mt-2">{card.caption}</p>
            </div>
          ))}
        </div>

        {/* Your Performance */}
        <div className="glass-card rounded-2xl border border-zinc-800">
          <div className="p-6 border-b border-zinc-800/60">
            <h3 className="text-lg font-semibold text-white">Your Performance vs Global Average</h3>
          </div>
          <div className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#a1a1aa" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#a1a1aa" fontSize={12} />
                  <Bar dataKey="averageScore" fill="#27272a" name="Global Average" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="userScore" fill="#06b6d4" name="Your Score" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-zinc-700 rounded mr-2"></div>
                <span className="text-sm text-zinc-400">Global Average</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded mr-2"></div>
                <span className="text-sm text-zinc-400">Your Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="glass-card rounded-2xl border border-zinc-800">
          <div className="p-6 border-b border-zinc-800/60">
            <h3 className="text-lg font-semibold text-white">Detailed Performance Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benchmarks.map((benchmark, index) => (
                <div key={index} className="border border-zinc-800 rounded-lg p-4 glass-card">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{benchmark.category}</h4>
                    <span className="text-sm font-medium text-zinc-400">{benchmark.percentile}th percentile</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Your Score</span>
                      <span className="font-medium text-white">{benchmark.userScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Global Average</span>
                      <span className="font-medium text-white">{benchmark.averageScore}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 mt-3">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full" 
                        style={{ width: `${(benchmark.userScore / Math.max(benchmark.userScore, benchmark.averageScore, 100)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className={`mt-3 text-xs font-medium ${
                    benchmark.userScore > benchmark.averageScore 
                      ? 'text-green-400' 
                      : 'text-orange-400'
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
        <div className="rounded-xl p-6 border border-zinc-800 glass-card">
          <h3 className="text-lg font-semibold text-white mb-2">Insights</h3>
          <div className="space-y-2 text-sm text-zinc-300">
            <p>• You're excelling in <span className="text-cyan-400">Async Patterns</span> (95th percentile) — consider mentoring others.</p>
            <p>• <span className="text-cyan-400">Testing Coverage</span> needs attention — focus here next week.</p>
            <p>• Your <span className="text-cyan-400">Function Length</span> trend places you in the top 25%.</p>
            <p>• Maintain momentum with <span className="text-cyan-400">Error Handling</span> — trending upward.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Benchmarks;