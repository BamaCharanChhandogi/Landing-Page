import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Github, Mail, ArrowLeft, Terminal, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Auth: React.FC = () => {
  const { user, loading, signIn } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [provider, setProvider] = useState<'google' | 'github' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignIn = async (selectedProvider: 'google' | 'github') => {
    setSigningIn(true);
    setProvider(selectedProvider);
    try {
      await signIn(selectedProvider);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setSigningIn(false);
      setProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 grid-bg opacity-10"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl">
                <Terminal className="w-8 h-8 text-black" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold gradient-text">CodeCoach</h1>
              <p className="text-zinc-400 code-font text-sm">AI.POWERED</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Initialize Your <span className="gradient-text">Evolution</span>
          </h2>
          <p className="text-zinc-400">
            Connect your development identity to begin AI-powered coaching
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-card py-8 px-4 shadow-2xl rounded-2xl border border-zinc-800 sm:px-10">
          <div className="space-y-6">
            {/* Google Sign In */}
            <button
              onClick={() => handleSignIn('google')}
              disabled={signingIn}
              className="w-full flex justify-center items-center px-4 py-4 glass-card rounded-xl text-white hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {signingIn && provider === 'google' ? (
                <LoadingSpinner size="small" className="mr-3" />
              ) : (
                <Mail className="w-5 h-5 mr-3 text-red-400 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium">Continue with Google</span>
            </button>

            {/* GitHub Sign In */}
            <button
              onClick={() => handleSignIn('github')}
              disabled={signingIn}
              className="w-full flex justify-center items-center px-4 py-4 glass-card rounded-xl text-white hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {signingIn && provider === 'github' ? (
                <LoadingSpinner size="small" className="mr-3" />
              ) : (
                <Github className="w-5 h-5 mr-3 text-white group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium">Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-zinc-900 text-zinc-400 code-font">SYSTEM.FEATURES</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-zinc-300">
                    <span className="text-cyan-400 font-medium code-font">NEURAL.ANALYSIS</span> - Real-time code pattern recognition
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-zinc-300">
                    <span className="text-blue-400 font-medium code-font">ADAPTIVE.COACHING</span> - Personalized skill evolution
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-zinc-300">
                    <span className="text-purple-400 font-medium code-font">QUANTUM.BENCHMARKS</span> - Global developer comparison
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              By connecting, you agree to our{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Neural Network Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Privacy Protocol
              </a>
            </p>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to main system
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;