import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, RefreshCw, AlertCircle, Shield } from 'lucide-react';
import { LogEntry } from '../types';

interface LogAnalyzerProps {
  logs: LogEntry[];
}

const LogAnalyzer: React.FC<LogAnalyzerProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showThreatsOnly, setShowThreatsOnly] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (log.sourceIP && log.sourceIP.includes(searchTerm));
      
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchesType = typeFilter === 'all' || log.type === typeFilter;
      const matchesThreat = !showThreatsOnly || log.threat;

      return matchesSearch && matchesSeverity && matchesType && matchesThreat;
    });
  }, [logs, searchTerm, severityFilter, typeFilter, showThreatsOnly]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border border-red-200';
      case 'high': return 'text-orange-700 bg-orange-100 border border-orange-200';
      case 'medium': return 'text-amber-700 bg-amber-100 border border-amber-200';
      case 'low': return 'text-emerald-700 bg-emerald-100 border border-emerald-200';
      default: return 'text-gray-700 bg-gray-100 border border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Log Analysis</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="auth">Authentication</option>
            <option value="firewall">Firewall</option>
            <option value="system">System</option>
            <option value="network">Network</option>
            <option value="application">Application</option>
          </select>

          {/* Threats Only Toggle */}
          <label className="flex items-center space-x-2 text-gray-900 cursor-pointer">
            <input
              type="checkbox"
              checked={showThreatsOnly}
              onChange={(e) => setShowThreatsOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Threats Only</span>
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Logs</p>
              <p className="text-gray-900 text-xl font-bold">{filteredLogs.length}</p>
            </div>
            <Filter className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">With Threats</p>
              <p className="text-gray-900 text-xl font-bold">{filteredLogs.filter(log => log.threat).length}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Critical</p>
              <p className="text-gray-900 text-xl font-bold">{filteredLogs.filter(log => log.severity === 'critical').length}</p>
            </div>
            <Shield className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Last Hour</p>
              <p className="text-gray-900 text-xl font-bold">{filteredLogs.filter(log => 
                Date.now() - log.timestamp.getTime() < 3600000
              ).length}</p>
            </div>
            <RefreshCw className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Timestamp</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Source</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Severity</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Message</th>
                <th className="px-4 py-3 text-left text-gray-700 font-semibold">Threat</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={log.id} className={`border-t border-gray-200 hover:bg-gray-50 ${
                  log.threat ? 'bg-red-50' : ''
                }`}>
                  <td className="px-4 py-3 text-gray-700 font-mono text-xs">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{log.source}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                      {log.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getSeverityColor(log.severity)}`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-md truncate">{log.message}</td>
                  <td className="px-4 py-3">
                    {log.threat ? (
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600 text-xs font-medium">{log.threat.type.replace('_', ' ').toUpperCase()}</span>
                        <span className="text-gray-500 text-xs">({Math.round(log.threat.confidence * 100)}%)</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogAnalyzer;