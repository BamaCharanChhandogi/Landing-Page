import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Github, Mail, ArrowLeft, Code } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Auth: React.FC = () => {
  const { user, loading, signIn } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [provider, setProvider] = useState<'google' | 'github' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeCoach AI
              </h1>
            </div>
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome to your AI coding coach
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to start improving your coding skills with personalized AI insights
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <div className="space-y-4">
            {/* Google Sign In */}
            <button
              onClick={() => handleSignIn('google')}
              disabled={signingIn}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingIn && provider === 'google' ? (
                <LoadingSpinner size="small" className="mr-3" />
              ) : (
                <Mail className="w-5 h-5 mr-3 text-red-500" />
              )}
              Continue with Google
            </button>

            {/* GitHub Sign In */}
            <button
              onClick={() => handleSignIn('github')}
              disabled={signingIn}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signingIn && provider === 'github' ? (
                <LoadingSpinner size="small" className="mr-3" />
              ) : (
                <Github className="w-5 h-5 mr-3 text-gray-900" />
              )}
              Continue with GitHub
            </button>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">What you get with CodeCoach</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Personalized AI coaching</span> based on your actual code patterns
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Real-time insights</span> and improvement suggestions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Global benchmarking</span> to see how you compare
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;