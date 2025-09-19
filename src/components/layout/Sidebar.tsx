import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Users, 
  Settings, 
  CreditCard,
  Code,
  Zap
} from 'lucide-react';

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
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
      <div className="flex items-center flex-shrink-0 px-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">CodeCoach</h1>
            <p className="text-xs text-gray-500">AI-Powered</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8 flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                ${isActive
                  ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                group flex items-center px-2 py-2 text-sm font-medium rounded-l-md transition-colors duration-200
              `}
            >
              <item.icon
                className={`
                  ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
                  mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200
                `}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="flex-shrink-0 px-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center">
            <Zap className="w-5 h-5 text-blue-600" />
            <span className="ml-2 text-sm font-medium text-blue-900">Pro Plan</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">Advanced AI coaching</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;