import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Check, Crown, Users, Building, Zap, X } from 'lucide-react';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic weekly reports',
        '1 project tracking',
        'Community benchmarks',
        'VS Code extension',
        '14-day Pro trial'
      ],
      limitations: [
        'Generic coaching',
        'No real-time insights',
        'No team features',
        'Limited AI processing'
      ],
      current: user?.subscription === 'free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: { monthly: 19, annual: 190 },
      description: 'For serious individual developers',
      features: [
        'Unlimited AI coaching',
        '5 projects tracking',
        'Real-time insights',
        'Daily micro-insights',
        'Advanced benchmarking',
        'Multi-channel delivery',
        'Learning path recommendations',
        'Priority AI processing',
        'Historical trend analysis (6 months)'
      ],
      current: user?.subscription === 'pro',
      popular: true,
      color: 'blue'
    },
    {
      name: 'Team',
      price: { monthly: 99, annual: 990 },
      description: '5 developers included',
      features: [
        'Everything in Pro',
        'Team dashboard',
        'Collaborative insights',
        'Code review AI integration',
        'Team benchmarking',
        'Slack/Teams integration',
        'Manager coaching insights',
        'Onboarding tracking',
        'Custom team benchmarks'
      ],
      current: user?.subscription === 'team',
      popular: false,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: { monthly: 500, annual: 5000 },
      description: 'Unlimited developers',
      features: [
        'Everything in Team',
        'Unlimited developers',
        'Custom AI model tuning',
        'Advanced security',
        'Dedicated account manager',
        'API access',
        'Custom branding',
        'Executive reporting',
        'On-premise deployment'
      ],
      current: user?.subscription === 'enterprise',
      popular: false,
      color: 'gold'
    }
  ];

  const getIcon = (planName: string) => {
    switch (planName) {
      case 'Pro':
        return <Zap className="w-5 h-5" />;
      case 'Team':
        return <Users className="w-5 h-5" />;
      case 'Enterprise':
        return <Building className="w-5 h-5" />;
      default:
        return <Crown className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string, current: boolean) => {
    if (current) {
      return {
        border: 'border-green-500 ring-2 ring-green-200',
        button: 'bg-green-600 text-white',
        badge: 'bg-green-100 text-green-800'
      };
    }

    switch (color) {
      case 'blue':
        return {
          border: 'border-blue-500 ring-2 ring-blue-200',
          button: 'bg-blue-600 text-white hover:bg-blue-700',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'purple':
        return {
          border: 'border-purple-300 hover:border-purple-400',
          button: 'bg-purple-600 text-white hover:bg-purple-700',
          badge: 'bg-purple-100 text-purple-800'
        };
      case 'gold':
        return {
          border: 'border-yellow-300 hover:border-yellow-400',
          button: 'bg-yellow-600 text-white hover:bg-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          border: 'border-gray-200 hover:border-gray-300',
          button: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="text-gray-600 mt-2">Upgrade anytime. Cancel anytime. No hidden fees.</p>
        </div>

        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Current Plan: {user?.subscription?.toUpperCase()}</h2>
              <p className="text-blue-100">
                {user?.subscription === 'free' ? 'Upgrade to unlock advanced AI coaching' : 'Thanks for being a valued member!'}
              </p>
            </div>
            <div className="text-right">
              {user?.subscription !== 'free' && (
                <div>
                  <div className="text-2xl font-bold">
                    ${plans.find(p => p.name.toLowerCase() === user?.subscription)?.price.monthly}/mo
                  </div>
                  <div className="text-sm text-blue-200">Next billing: Feb 21, 2025</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                billingPeriod === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const colors = getColorClasses(plan.color, plan.current);
            const price = billingPeriod === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12);
            
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${colors.border} ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.current && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    plan.color === 'gold' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {getIcon(plan.name)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    {price > 0 && <span className="text-gray-600">/month</span>}
                  </div>
                  
                  {billingPeriod === 'annual' && price > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      Save ${(plan.price.monthly * 12) - plan.price.annual} annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, index) => (
                    <li key={index} className="flex items-start">
                      <X className="w-4 h-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${colors.button}`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 
                   plan.name === 'Free' ? 'Downgrade' :
                   plan.name === 'Enterprise' ? 'Contact Sales' : 
                   `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Feature Comparison</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Features</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Free</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Pro</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Team</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { feature: 'AI Coaching', free: 'Basic', pro: 'Unlimited', team: 'Unlimited', enterprise: 'Custom' },
                    { feature: 'Project Tracking', free: '1', pro: '5', team: 'Unlimited', enterprise: 'Unlimited' },
                    { feature: 'Real-time Insights', free: '×', pro: '✓', team: '✓', enterprise: '✓' },
                    { feature: 'Team Dashboard', free: '×', pro: '×', team: '✓', enterprise: '✓' },
                    { feature: 'API Access', free: '×', pro: '×', team: '×', enterprise: '✓' },
                    { feature: 'Support', free: 'Community', pro: 'Email', team: 'Priority', enterprise: 'Dedicated' }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-sm text-gray-900">{row.feature}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-600">{row.free}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-600">{row.pro}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-600">{row.team}</td>
                      <td className="py-3 px-4 text-sm text-center text-gray-600">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-sm text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Is my code data secure?</h4>
              <p className="text-sm text-gray-600">We never store your actual source code. We only analyze function-level patterns and metadata, all encrypted and secure.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-gray-600">We accept all major credit cards and PayPal. Enterprise customers can also pay via invoice.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;