import React from 'react';
import Layout from '../components/layout/Layout';
import { useUser } from '../contexts/UserContext';
// Removed decorative icons to achieve a more minimal, professional feel

const Reports: React.FC = () => {
  const { weeklyReport } = useUser();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white code-font">Weekly Reports</h1>
            <p className="text-zinc-400 mt-1">Comprehensive analysis of your coding progress</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all">
            Export Report
          </button>
        </div>

        {/* Current Week Report */}
        <div className="glass-card rounded-2xl border border-zinc-800">
          <div className="p-6 border-b border-zinc-800/60">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Current Week Report</h3>
                <p className="text-sm text-zinc-400">{weeklyReport.period}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[{label:'Quality Score',value:78},{label:'Issues Fixed',value:23},{label:'Commits',value:18}].map((stat) => (
                <div key={stat.label} className="text-center glass-card rounded-xl p-4 border border-zinc-800">
                  <div className="text-3xl font-bold gradient-text mb-1 code-font">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Weekly Summary</h4>
              <p className="text-zinc-300 bg-zinc-900/60 p-4 rounded-lg border border-zinc-800">
                {weeklyReport.summary}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Highlights</h4>
                <ul className="space-y-2">
                  {weeklyReport.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-zinc-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Next Week Goals</h4>
                <ul className="space-y-2">
                  {weeklyReport.nextWeekGoals.map((goal: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                      <span className="text-zinc-300">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Reports */}
        <div className="glass-card rounded-2xl border border-zinc-800">
          <div className="p-6 border-b border-zinc-800/60">
            <h3 className="text-lg font-semibold text-white">Previous Reports</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { period: 'Jan 8 - Jan 14, 2025', score: 75, trend: '+5%' },
                { period: 'Jan 1 - Jan 7, 2025', score: 71, trend: '+8%' },
                { period: 'Dec 25 - Dec 31, 2024', score: 66, trend: '+12%' },
                { period: 'Dec 18 - Dec 24, 2024', score: 59, trend: '+3%' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-white">{report.period}</p>
                    <p className="text-sm text-zinc-400">Quality Score: {report.score}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-sm font-medium">{report.trend}</span>
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View Report</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;