import React from 'react';
import Layout from '../components/layout/Layout';
import { useUser } from '../contexts/UserContext';
import { Calendar, TrendingUp, Award, Target, FileText, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const { weeklyReport, codingStats } = useUser();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Weekly Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive analysis of your coding progress</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Current Week Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Current Week Report</h3>
                  <p className="text-sm text-gray-500">{weeklyReport.period}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">78</div>
                <div className="text-sm text-gray-600">Quality Score</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
                <div className="text-sm text-gray-600">Issues Fixed</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">18</div>
                <div className="text-sm text-gray-600">Commits</div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Weekly Summary</h4>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {weeklyReport.summary}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">🎉 Highlights</h4>
                <ul className="space-y-2">
                  {weeklyReport.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Next Week Goals</h4>
                <ul className="space-y-2">
                  {weeklyReport.nextWeekGoals.map((goal: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-600">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Previous Reports</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { period: 'Jan 8 - Jan 14, 2025', score: 75, trend: '+5%' },
                { period: 'Jan 1 - Jan 7, 2025', score: 71, trend: '+8%' },
                { period: 'Dec 25 - Dec 31, 2024', score: 66, trend: '+12%' },
                { period: 'Dec 18 - Dec 24, 2024', score: 59, trend: '+3%' }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{report.period}</p>
                      <p className="text-sm text-gray-500">Quality Score: {report.score}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 text-sm font-medium">{report.trend}</span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Report
                    </button>
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