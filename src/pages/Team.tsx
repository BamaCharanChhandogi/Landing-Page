import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAnalytics } from '../contexts/AnalyticsContext';
// Removed decorative icons and simplified visuals for a professional tone

const Team: React.FC = () => {
  const { teamMembers } = useAnalytics();
  const [activeTab, setActiveTab] = useState<'members' | 'analytics' | 'settings'>('members');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white code-font">Team Dashboard</h1>
            <p className="text-zinc-400 mt-1">Manage your team and track collective progress</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all">
            Invite Member
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[{label:'Team Size', value: teamMembers.length}, {label:'Avg Quality Score', value: 75}, {label:'Team Commits', value: 156}, {label:'Active Members', value: teamMembers.length}].map((card) => (
            <div key={card.label} className="glass-card rounded-2xl p-6 border border-zinc-800">
              <p className="text-sm font-medium text-zinc-400">{card.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
              {card.label === 'Team Commits' && <p className="text-xs text-zinc-500 mt-1">This week</p>}
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card rounded-2xl border border-zinc-800">
          <div className="border-b border-zinc-800/60">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'members', label: 'Team Members' },
                { key: 'analytics', label: 'Team Analytics' },
                { key: 'settings', label: 'Settings' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`${
                    activeTab === key
                      ? 'border-cyan-500 text-cyan-400'
                      : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-600'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'members' && (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-white">{member.name}</h4>
                        <p className="text-sm text-zinc-400">{member.email}</p>
                        <p className="text-xs text-zinc-500">{member.recentActivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">{member.skillLevel}</div>
                        <div className="text-xs text-zinc-400">Score: {member.improvementScore}</div>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center">
                          <span className="text-cyan-400 text-xs font-bold">
                            {member.improvementScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-lg p-6 border border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Team Strengths</h3>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span>Strong async/await adoption (95%)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span>Consistent code formatting</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span>Good error handling patterns</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card rounded-lg p-6 border border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Areas to Improve</h3>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Testing coverage varies (30-80%)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Function length consistency</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Code review turnaround time</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass-card border border-zinc-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Team Learning Recommendations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border border-zinc-800 rounded-lg glass-card">
                      <h4 className="font-medium mb-2 text-white">Testing Workshop</h4>
                      <p className="text-sm text-zinc-400">Improve team testing practices</p>
                    </div>
                    <div className="text-center p-4 border border-zinc-800 rounded-lg glass-card">
                      <h4 className="font-medium mb-2 text-white">Code Review Best Practices</h4>
                      <p className="text-sm text-zinc-400">Streamline review process</p>
                    </div>
                    <div className="text-center p-4 border border-zinc-800 rounded-lg glass-card">
                      <h4 className="font-medium mb-2 text-white">Pair Programming</h4>
                      <p className="text-sm text-zinc-400">Knowledge sharing sessions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Team Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Daily Reports</h4>
                        <p className="text-sm text-zinc-400">Send daily team progress updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Slack Integration</h4>
                        <p className="text-sm text-zinc-400">Post insights to team Slack channel</p>
                      </div>
                      <button className="px-4 py-2 bg-cyan-600 text-black font-medium rounded-lg text-sm hover:bg-cyan-500 transition-colors">
                        Connected
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Anonymous Benchmarking</h4>
                        <p className="text-sm text-zinc-400">Contribute to global developer benchmarks</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
                  <div className="border border-red-900/40 rounded-lg p-4 bg-red-950/30">
                    <h4 className="font-medium text-red-400 mb-2">Delete Team</h4>
                    <p className="text-sm text-red-300 mb-4">
                      Permanently delete this team and all associated data. This cannot be undone.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors">
                      Delete Team
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;