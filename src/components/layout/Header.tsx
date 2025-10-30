import React, { useState } from 'react';
import { Bell, Search, ChevronDown, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { recentInsights } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = recentInsights.filter(insight => !insight.read).length;

  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h2 className="text-xl font-semibold gradient-text code-font">NEURAL.DASHBOARD</h2>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search neural patterns..."
                    className="pl-10 pr-4 py-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-zinc-500 code-font"
                  />
                </div>
              </div>

              {/* Notifications */}
              <div className="ml-3 relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-xs text-black flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 glass-card rounded-xl border border-zinc-700 focus:outline-none z-50">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-zinc-700">
                        <p className="text-sm font-medium text-white code-font">NEURAL.INSIGHTS</p>
                      </div>
                      {recentInsights.slice(0, 4).map((insight) => (
                        <div key={insight.id} className={`px-4 py-3 hover:bg-zinc-800 transition-colors ${!insight.read ? 'bg-cyan-500/10 border-l-2 border-cyan-400' : ''}`}>
                          <p className="text-sm font-medium text-white">{insight.title}</p>
                          <p className="text-xs text-zinc-400 mt-1">{insight.description}</p>
                          <div className="flex items-center mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full code-font ${
                              insight.impact === 'high' 
                                ? 'bg-red-500/20 text-red-400' 
                                : insight.impact === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {insight.impact.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="ml-3 relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center max-w-xs glass-card rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-zinc-800 transition-all"
                >
                  <img
                    className="h-8 w-8 rounded-lg"
                    src={user?.avatar}
                    alt={user?.name}
                  />
                  <span className="ml-2 text-sm font-medium text-white code-font">{user?.name?.split(' ')[0].toUpperCase()}</span>
                  <ChevronDown className="ml-2 h-4 w-4 text-zinc-400" />
                </button>

                {showProfileMenu && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 glass-card rounded-xl border border-zinc-700 focus:outline-none z-50">
                    <div className="py-1">
                      <div className="px-4 py-3 border-b border-zinc-700">
                        <p className="text-sm text-zinc-400 code-font">{user?.email}</p>
                        <div className="flex items-center mt-1">
                          <Zap className="w-3 h-3 text-cyan-400 mr-1" />
                          <p className="text-xs text-cyan-400 font-medium code-font">{user?.subscription?.toUpperCase()}</p>
                        </div>
                      </div>
                      <a href="#" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                        Neural Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                        Billing Matrix
                      </a>
                      <button
                        onClick={signOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;