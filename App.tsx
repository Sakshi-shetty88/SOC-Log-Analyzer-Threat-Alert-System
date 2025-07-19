import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, Globe, Menu, X, Database } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LogAnalyzer from './components/LogAnalyzer';
import AlertSystem from './components/AlertSystem';
import ThreatIntelligence from './components/ThreatIntelligence';
import DataSources from './components/DataSources';
import { mockLogs, mockAlerts, mockMetrics } from './data/mockData';

type ActiveTab = 'dashboard' | 'logs' | 'alerts' | 'threats' | 'sources';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity, component: Dashboard },
    { id: 'logs', name: 'Log Analysis', icon: Shield, component: LogAnalyzer },
    { id: 'alerts', name: 'Alerts', icon: AlertTriangle, component: AlertSystem },
    { id: 'threats', name: 'Threat Intel', icon: Globe, component: ThreatIntelligence },
    { id: 'sources', name: 'Data Sources', icon: Database, component: DataSources },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard metrics={mockMetrics} />;
      case 'logs':
        return <LogAnalyzer logs={mockLogs} />;
      case 'alerts':
        return <AlertSystem alerts={mockAlerts} />;
      case 'threats':
        return <ThreatIntelligence />;
      case 'sources':
        return <DataSources />;
      default:
        return <Dashboard metrics={mockMetrics} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-lg">CyberSOC</h1>
              <p className="text-gray-600 text-xs">Security Operations</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as ActiveTab);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-3 border border-emerald-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 text-sm font-medium">System Status</span>
            </div>
            <p className="text-emerald-600 text-xs">All systems operational</p>
            <p className="text-emerald-500 text-xs">Last check: 30s ago</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Connected to 12 data sources</span>
              </div>
              <div className="text-gray-600 text-sm">
                {new Date().toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveComponent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;