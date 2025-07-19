import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, User, ExternalLink, Eye } from 'lucide-react';
import { Alert } from '../types';

interface AlertSystemProps {
  alerts: Alert[];
}

const AlertSystem: React.FC<AlertSystemProps> = ({ alerts }) => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => 
    statusFilter === 'all' || alert.status === statusFilter
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-400 bg-red-400/10';
      case 'investigating': return 'text-yellow-400 bg-yellow-400/10';
      case 'resolved': return 'text-green-400 bg-green-400/10';
      case 'false_positive': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4" />;
      case 'investigating': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'false_positive': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Security Alerts</h2>
        <div className="flex items-center space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="false_positive">False Positive</option>
          </select>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Open Alerts</p>
              <p className="text-white text-xl font-bold">{alerts.filter(a => a.status === 'open').length}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical</p>
              <p className="text-white text-xl font-bold">{alerts.filter(a => a.severity === 'critical').length}</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Investigating</p>
              <p className="text-white text-xl font-bold">{alerts.filter(a => a.status === 'investigating').length}</p>
            </div>
            <Clock className="h-6 w-6 text-yellow-400" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-white text-xl font-bold">{alerts.filter(a => a.status === 'resolved').length}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Active Alerts</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className="p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm">{alert.id}</span>
                  </div>
                  <span className="text-gray-400 text-xs">{formatTimestamp(alert.timestamp)}</span>
                </div>
                <h4 className="text-white font-medium mb-1">{alert.title}</h4>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(alert.status)}`}>
                    {getStatusIcon(alert.status)}
                    <span>{alert.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                  {alert.assignee && (
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <User className="h-3 w-3" />
                      <span>{alert.assignee.split('@')[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Details */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Alert Details</h3>
          </div>
          {selectedAlert ? (
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 text-sm rounded-full border ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-sm">{selectedAlert.id}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{selectedAlert.title}</h4>
                <p className="text-gray-300">{selectedAlert.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm w-fit ${getStatusColor(selectedAlert.status)}`}>
                    {getStatusIcon(selectedAlert.status)}
                    <span>{selectedAlert.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Threat Type</p>
                  <p className="text-white">{selectedAlert.threatType}</p>
                </div>
              </div>

              {selectedAlert.sourceIP && (
                <div>
                  <p className="text-gray-400 text-sm">Source IP</p>
                  <p className="text-white font-mono">{selectedAlert.sourceIP}</p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-2">Affected Assets</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.affectedAssets.map((asset, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-400/10 text-blue-400 text-sm rounded">
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Indicators</p>
                <ul className="space-y-1">
                  {selectedAlert.indicators.map((indicator, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center space-x-2">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Recommended Actions</p>
                <ul className="space-y-1">
                  {selectedAlert.recommendedActions.map((action, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Assign to Me
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;