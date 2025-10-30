import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ChartBar as BarChart3, Users, Settings, CreditCard, Terminal, Zap } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Benchmarks', href: '/benchmarks', icon: BarChart3 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Subscription', href: '/subscription', icon: CreditCard },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4 mb-8">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-black" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold gradient-text">CodeCoach</h1>
            <p className="text-xs text-zinc-400 code-font">AI.SYSTEM</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-2 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                ${isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-r-2 border-cyan-400 text-cyan-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }
                group flex items-center px-3 py-3 text-sm font-medium rounded-l-lg transition-all duration-200
              `}
            >
              <item.icon
                className={`
                  ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'}
                  mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200
                `}
                aria-hidden="true"
              />
              <span className="code-font font-medium">{item.name.toUpperCase()}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-shrink-0 px-4">
        <div className="glass-card rounded-xl p-4 border border-cyan-500/20">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="ml-2 text-sm font-medium text-cyan-400 code-font">PRO.ACTIVE</span>
          </div>
          <p className="text-xs text-zinc-400">Neural coaching enabled</p>
          <div className="mt-3 w-full bg-zinc-800 rounded-full h-1">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-zinc-500 mt-1 code-font">EVOLUTION: 78%</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;