import React from 'react';
import { Shield, AlertTriangle, Activity, Clock, TrendingUp, Users } from 'lucide-react';
import { SecurityMetrics } from '../types';

interface DashboardProps {
  metrics: SecurityMetrics;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const MetricCard = ({ icon: Icon, title, value, subtitle, color }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Security Operations Center</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-600 text-sm font-medium">Live Monitoring</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Activity}
          title="Total Logs Today"
          value={metrics.totalLogs.toLocaleString()}
          color="text-blue-600"
        />
        <MetricCard
          icon={AlertTriangle}
          title="Active Alerts"
          value={metrics.alertsToday}
          color="text-amber-600"
        />
        <MetricCard
          icon={Shield}
          title="Critical Alerts"
          value={metrics.criticalAlerts}
          color="text-red-600"
        />
        <MetricCard
          icon={Clock}
          title="Avg Response Time"
          value={`${metrics.averageResponseTime}m`}
          color="text-emerald-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Timeline (24h)</h3>
          <div className="space-y-3">
            {metrics.timeSeriesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600 text-sm w-12">{data.time}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(data.alerts / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-900 text-sm font-medium w-8">{data.alerts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Threats */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Threat Types</h3>
          <div className="space-y-4">
            {metrics.topThreats.map((threat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-red-500' : 
                    index === 1 ? 'bg-orange-500' : 
                    index === 2 ? 'bg-amber-500' : 
                    'bg-blue-500'
                  }`}></div>
                  <span className="text-gray-700">{threat.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium">{threat.count}</span>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
            <div>
              <p className="text-emerald-700 text-sm font-medium">Detection Rules</p>
              <p className="text-emerald-900 font-bold">247 Active</p>
            </div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div>
              <p className="text-blue-700 text-sm font-medium">Data Sources</p>
              <p className="text-blue-900 font-bold">12 Connected</p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div>
              <p className="text-purple-700 text-sm font-medium">Analysts Online</p>
              <p className="text-purple-900 font-bold">4 Active</p>
            </div>
            <Users className="h-5 w-5 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;