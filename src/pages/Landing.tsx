import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 grid-bg opacity-20"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
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

      {/* Mouse follower */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-0"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          transition: 'all 0.1s ease'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">CodeCoach</h1>
            <p className="text-xs text-zinc-400 code-font">AI.POWERED</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#features" className="text-zinc-300 hover:text-cyan-400 transition-colors">Features</a>
          <a href="#pricing" className="text-zinc-300 hover:text-cyan-400 transition-colors">Pricing</a>
          <Link 
            to="/auth" 
            className="cyber-button px-6 py-2 rounded-lg font-medium"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 glass-card rounded-full mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
            <span className="text-sm text-zinc-300 code-font">NEXT-GEN AI COACHING</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="glitch gradient-text" data-text="EVOLVE YOUR">EVOLVE YOUR</span>
            <br />
            <span className="typing-animation code-font">CODING DNA</span>
          </h1>
          
          <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            The world's first AI that analyzes your actual code patterns to provide 
            <span className="text-cyan-400"> personalized coaching</span> that adapts to your skill level.
            From junior to architect - accelerate your evolution.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-black hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-center"
            >
              Initialize Coaching
            </Link>
            <a 
              href="#demo" 
              className="px-8 py-4 glass-card rounded-lg font-semibold text-cyan-400 hover:bg-zinc-800/50 transition-all duration-300 text-center"
            >
              View Source
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl pulse-glow">
              <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-zinc-400 code-font">DEVELOPERS</div>
            </div>
            <div className="glass-card p-6 rounded-xl pulse-glow">
              <div className="text-3xl font-bold gradient-text mb-2">2.5M+</div>
              <div className="text-zinc-400 code-font">FUNCTIONS ANALYZED</div>
            </div>
            <div className="glass-card p-6 rounded-xl pulse-glow">
              <div className="text-3xl font-bold gradient-text mb-2">89%</div>
              <div className="text-zinc-400 code-font">SKILL IMPROVEMENT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              NEURAL ARCHITECTURE
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Advanced AI systems that understand your code like a senior architect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group floating-card glass-card p-8 rounded-2xl holographic">
              <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">PATTERN RECOGNITION</h3>
              <p className="text-zinc-400 leading-relaxed">
                Deep learning algorithms analyze your actual functions, not generic examples. 
                Understands your unique coding DNA and evolution patterns.
              </p>
            </div>

            <div className="group floating-card glass-card p-8 rounded-2xl holographic">
              <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">ADAPTIVE COACHING</h3>
              <p className="text-zinc-400 leading-relaxed">
                AI that evolves with you. From beginner syntax to architect-level system design. 
                Coaching complexity scales with your growth trajectory.
              </p>
            </div>

            <div className="group floating-card glass-card p-8 rounded-2xl holographic">
              <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">QUANTUM BENCHMARKS</h3>
              <p className="text-zinc-400 leading-relaxed">
                Compare against global developer patterns. Anonymous data from 50K+ developers 
                creates the most accurate skill benchmarking system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Demo Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 aurora-bg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-zinc-400 code-font text-sm">AI_ANALYSIS.js</span>
            </div>
            
            <div className="bg-black/50 rounded-xl p-6 code-font">
              <div className="text-green-400 mb-4">// Your code evolution in real-time</div>
              <div className="text-cyan-400">function <span className="text-white">processUserData</span>(<span className="text-orange-400">userData</span>) {'{'}</div>
              <div className="text-zinc-500 ml-4">// AI: Consider destructuring for cleaner code</div>
              <div className="ml-4 text-white">const {'{'} <span className="text-orange-400">name, userEmail, preferences</span> {'}'} = userData;</div>
              <div className="ml-4 text-white">return {'{'} name, userEmail, preferences {'}'};</div>
              <div className="text-cyan-400">{'}'}</div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <div className="text-cyan-400 text-sm">🧠 AI INSIGHT</div>
                <div className="text-white mt-2">Great improvement! Function complexity reduced by 67%. 
                You're now in the top 15% for clean code patterns.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              CHOOSE YOUR EVOLUTION
            </h2>
            <p className="text-xl text-zinc-400">
              Transparent pricing. No hidden algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="glass-card p-8 rounded-2xl border-zinc-800">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">INITIATE</h3>
                <div className="text-4xl font-bold gradient-text mb-4">$0</div>
                <p className="text-zinc-400">Start your journey</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Basic weekly insights
                </li>
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  1 project analysis
                </li>
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Community benchmarks
                </li>
              </ul>
              <Link 
                to="/auth" 
                className="block w-full text-center py-3 px-4 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Initialize
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="relative glass-card p-8 rounded-2xl border-cyan-500 neon-glow transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold gradient-text mb-2">EVOLVE</h3>
                <div className="text-4xl font-bold text-white mb-4">$19</div>
                <p className="text-zinc-400">Accelerate growth</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Unlimited AI coaching
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Real-time insights
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Advanced benchmarking
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                  Multi-channel delivery
                </li>
              </ul>
              <Link 
                to="/auth" 
                className="block w-full text-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-black font-semibold hover:shadow-lg transition-all"
              >
                Start Evolution
              </Link>
            </div>

            {/* Team Tier */}
            <div className="glass-card p-8 rounded-2xl border-zinc-800">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">ARCHITECT</h3>
                <div className="text-4xl font-bold gradient-text mb-4">$99</div>
                <p className="text-zinc-400">Team mastery</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Everything in Evolve
                </li>
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Team dashboard
                </li>
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Collaboration insights
                </li>
                <li className="flex items-center text-zinc-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Advanced analytics
                </li>
              </ul>
              <Link 
                to="/auth" 
                className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
              >
                Architect Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl aurora-bg">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              READY TO EVOLVE?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Join the next generation of developers who code with AI-powered intelligence.
            </p>
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-black hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 text-lg inline-block"
            >
              Initialize Your Evolution
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg" />
              <span className="text-lg font-semibold gradient-text">CodeCoach</span>
            </div>
            <div className="text-zinc-400 code-font text-sm">
              © 2025 CodeCoach AI. Evolving developers worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;