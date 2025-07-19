import React from 'react';
import { Globe, Shield, TrendingUp, AlertCircle, ExternalLink, MapPin } from 'lucide-react';

const ThreatIntelligence: React.FC = () => {
  const threatFeeds = [
    {
      name: 'Malware Hash DB',
      status: 'active',
      lastUpdate: '2 minutes ago',
      entries: 15847,
      type: 'IOC'
    },
    {
      name: 'Botnet C&C IPs',
      status: 'active',
      lastUpdate: '5 minutes ago',
      entries: 3421,
      type: 'IP'
    },
    {
      name: 'Phishing Domains',
      status: 'active',
      lastUpdate: '1 minute ago',
      entries: 8965,
      type: 'Domain'
    },
    {
      name: 'Compromised URLs',
      status: 'warning',
      lastUpdate: '15 minutes ago',
      entries: 12456,
      type: 'URL'
    }
  ];

  const recentThreats = [
    {
      id: 'TI-001',
      type: 'Malware Family',
      name: 'LockBit 3.0',
      severity: 'critical',
      confidence: 95,
      firstSeen: '2024-01-15',
      description: 'Ransomware variant targeting enterprise networks',
      geography: ['US', 'EU', 'APAC'],
      indicators: ['c2.lockbit3.onion', '0x4A5B6C7D8E9F', '192.168.100.45']
    },
    {
      id: 'TI-002',
      type: 'APT Group',
      name: 'Lazarus Group',
      severity: 'high',
      confidence: 88,
      firstSeen: '2024-01-14',
      description: 'State-sponsored group targeting financial institutions',
      geography: ['KR', 'JP', 'US'],
      indicators: ['apt.lazarus.temp', '0x1A2B3C4D5E6F', '203.0.113.89']
    },
    {
      id: 'TI-003',
      type: 'Vulnerability',
      name: 'CVE-2024-0001',
      severity: 'high',
      confidence: 92,
      firstSeen: '2024-01-13',
      description: 'Critical RCE in popular web framework',
      geography: ['Global'],
      indicators: ['exploit-db.com/49XXX', 'vulnerable-app.jar']
    }
  ];

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
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Threat Intelligence</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Globe className="h-4 w-4" />
            <span>Check IOCs</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
            <ExternalLink className="h-4 w-4" />
            <span>MISP Feed</span>
          </button>
        </div>
      </div>

      {/* Threat Feed Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {threatFeeds.map((feed, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-medium text-sm">{feed.name}</h3>
                <p className="text-gray-400 text-xs">{feed.type} Feed</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feed.status)}`}>
                {feed.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Entries:</span>
                <span className="text-white text-xs font-medium">{feed.entries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Updated:</span>
                <span className="text-white text-xs">{feed.lastUpdate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Threat Map Placeholder */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Global Threat Activity</h3>
        <div className="bg-gray-900 rounded-lg p-8 text-center">
          <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Interactive threat map would be displayed here</p>
          <p className="text-gray-500 text-sm mt-2">Showing real-time attack vectors and geographical distribution</p>
        </div>
      </div>

      {/* Recent Threat Intelligence */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Threat Intelligence</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {recentThreats.map((threat) => (
            <div key={threat.id} className="p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm rounded-full border ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-white font-semibold">{threat.name}</h4>
                    <p className="text-gray-400 text-sm">{threat.type} • {threat.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 text-sm">{threat.confidence}% confidence</span>
                  </div>
                  <p className="text-gray-400 text-xs">First seen: {threat.firstSeen}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{threat.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Geographic Distribution</p>
                  <div className="flex flex-wrap gap-2">
                    {threat.geography.map((region, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-400/10 text-purple-400 text-xs rounded">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Key Indicators</p>
                  <div className="space-y-1">
                    {threat.indicators.slice(0, 2).map((indicator, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="h-3 w-3 text-red-400" />
                        <span className="text-gray-300 text-xs font-mono">{indicator}</span>
                      </div>
                    ))}
                    {threat.indicators.length > 2 && (
                      <p className="text-gray-500 text-xs">+{threat.indicators.length - 2} more indicators</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">View Full Report</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Add to Watchlist</button>
                </div>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-300 text-sm">
                  <ExternalLink className="h-3 w-3" />
                  <span>External Source</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IOC Search */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">IOC Lookup</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter IP, domain, hash, or URL..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            Search
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-2">Search across multiple threat intelligence feeds</p>
      </div>
    </div>
  );
};

export default ThreatIntelligence;