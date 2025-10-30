import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
// Removed icons to reduce visual noise and achieve a bespoke feel

const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'integrations' | 'privacy'>('profile');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white code-font">Settings</h1>
          <p className="text-zinc-400 mt-1">Manage your account preferences and integrations</p>
        </div>

        <div className="glass-card rounded-2xl border border-zinc-800">
          {/* Navigation Tabs */}
          <div className="border-b border-zinc-800/60">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'profile', label: 'Profile' },
                { key: 'notifications', label: 'Notifications' },
                { key: 'integrations', label: 'Integrations' },
                { key: 'privacy', label: 'Privacy' }
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
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-white">{user?.name}</h3>
                    <p className="text-zinc-400">{user?.email}</p>
                    <button className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Experience Level
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      value={user?.skillLevel}
                      onChange={(e) => updateUser({ skillLevel: e.target.value as any })}
                    >
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="mid">Mid-level (2-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Primary Language
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      value={user?.primaryLanguage}
                      onChange={(e) => updateUser({ primaryLanguage: e.target.value })}
                    >
                      <option value="JavaScript">JavaScript</option>
                      <option value="TypeScript">TypeScript</option>
                      <option value="Python">Python</option>
                      <option value="Java">Java</option>
                      <option value="Go">Go</option>
                      <option value="Rust">Rust</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Work Context
                    </label>
                    <select 
                      className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      value={user?.workContext}
                      onChange={(e) => updateUser({ workContext: e.target.value as any })}
                    >
                      <option value="professional">Professional</option>
                      <option value="student">Student</option>
                      <option value="hobbyist">Hobbyist</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      value={user?.experienceYears}
                      onChange={(e) => updateUser({ experienceYears: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Learning Goals
                  </label>
                  <div className="space-y-2">
                    {['code-quality', 'performance', 'architecture', 'testing', 'security'].map((goal) => (
                      <label key={goal} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-zinc-700 rounded bg-zinc-900"
                          checked={user?.learningGoals.includes(goal)}
                          onChange={(e) => {
                            const goals = e.target.checked
                              ? [...(user?.learningGoals || []), goal]
                              : user?.learningGoals.filter(g => g !== goal) || [];
                            updateUser({ learningGoals: goals });
                          }}
                        />
                        <span className="ml-2 text-sm text-zinc-300 capitalize">
                          {goal.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Daily Micro-Insights</h4>
                        <p className="text-sm text-zinc-400">Short daily summary of your coding activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Weekly Reports</h4>
                        <p className="text-sm text-zinc-400">Comprehensive weekly analysis and insights</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Critical Alerts</h4>
                        <p className="text-sm text-zinc-400">Immediate alerts for critical code issues</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Achievement Celebrations</h4>
                        <p className="text-sm text-zinc-400">Celebrate your coding milestones and improvements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Delivery Channels</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-zinc-800 rounded-lg glass-card">
                      <h5 className="font-medium text-white mb-2">Email</h5>
                      <p className="text-sm text-zinc-400 mb-3">Receive notifications via email</p>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg text-sm text-white"
                        value={user?.email}
                        readOnly
                      />
                    </div>
                    <div className="p-4 border border-zinc-800 rounded-lg glass-card">
                      <h5 className="font-medium text-white mb-2">WhatsApp</h5>
                      <p className="text-sm text-zinc-400 mb-3">Quick insights on your phone</p>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-zinc-700 bg-zinc-900 rounded-lg text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Connected Services</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">GitHub</h4>
                        <p className="text-sm text-zinc-400">Connected to track your repositories</p>
                      </div>
                      <button className="px-4 py-2 bg-cyan-600 text-black rounded-lg text-sm hover:bg-cyan-500 transition-colors">
                        Connected
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Slack</h4>
                        <p className="text-sm text-zinc-400">Receive insights in your team channel</p>
                      </div>
                      <button className="px-4 py-2 border border-zinc-600 text-zinc-200 rounded-lg text-sm hover:bg-zinc-800 transition-colors">
                        Connect
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg glass-card">
                      <div>
                        <h4 className="font-medium text-white">Discord</h4>
                        <p className="text-sm text-zinc-400">Community discussions and updates</p>
                      </div>
                      <button className="px-4 py-2 border border-zinc-600 text-zinc-200 rounded-lg text-sm hover:bg-zinc-800 transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">VS Code Extension</h4>
                  <div className="glass-card border border-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-white">CodeCoach Extension</h5>
                        <p className="text-sm text-zinc-400">Seamlessly integrated with your IDE</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mt-2">
                      Extension is connected and tracking your coding activity
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Data Privacy</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-zinc-800 rounded-lg glass-card">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">Anonymous Benchmarking</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-zinc-300">
                        Share anonymous coding patterns to help improve global benchmarks. No personal information or actual code is shared.
                      </p>
                    </div>

                    <div className="p-4 border border-zinc-800 rounded-lg glass-card">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">Usage Analytics</h4>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                      </div>
                      <p className="text-sm text-zinc-300">
                        Allow us to collect usage data to improve the product. This helps us understand which features are most valuable.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Data Management</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors glass-card">
                      <div className="font-medium text-white">Download Your Data</div>
                      <div className="text-sm text-zinc-400">Export all your coding insights and progress data</div>
                    </button>
                    
                    <button className="w-full text-left px-4 py-3 border border-red-900/40 rounded-lg hover:bg-red-950/30 transition-colors">
                      <div className="font-medium text-red-400">Delete Account</div>
                      <div className="text-sm text-red-300">Permanently delete your account and all data</div>
                    </button>
                  </div>
                </div>

                <div className="glass-card border border-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Your Privacy Matters</h4>
                  <p className="text-sm text-zinc-300">
                    We never store your actual source code. We only analyze function-level patterns and metadata 
                    to provide personalized coaching insights. All data is encrypted and stored securely.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;