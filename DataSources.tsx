import React, { useState } from 'react';
import { 
  Database, 
  Wifi, 
  Shield, 
  Server, 
  Globe, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Settings,
  Plus,
  Eye,
  Activity
} from 'lucide-react';

const DataSources: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const dataSources = [
    {
      id: 'splunk',
      name: 'Splunk Enterprise',
      type: 'SIEM',
      status: 'connected',
      lastSync: '30 seconds ago',
      logsPerDay: '2.3M',
      icon: Database,
      description: 'Primary SIEM collecting logs from all enterprise systems',
      endpoints: ['https://splunk.company.com:8089'],
      logTypes: ['Authentication', 'Network', 'System', 'Application'],
      config: {
        host: 'splunk.company.com',
        port: 8089,
        username: 'soc_analyst',
        index: 'main,security,network'
      }
    },
    {
      id: 'firewall',
      name: 'Palo Alto Firewalls',
      type: 'Network Security',
      status: 'connected',
      lastSync: '1 minute ago',
      logsPerDay: '850K',
      icon: Shield,
      description: 'Perimeter firewalls providing network traffic logs',
      endpoints: ['10.0.1.1', '10.0.1.2', '10.0.1.3'],
      logTypes: ['Traffic', 'Threat', 'URL Filtering', 'Wildfire'],
      config: {
        syslogServer: '10.0.100.50',
        port: 514,
        format: 'CEF',
        facility: 'local0'
      }
    },
    {
      id: 'windows-dc',
      name: 'Windows Domain Controllers',
      type: 'Authentication',
      status: 'connected',
      lastSync: '45 seconds ago',
      logsPerDay: '1.2M',
      icon: Server,
      description: 'Active Directory authentication and authorization logs',
      endpoints: ['DC01.company.com', 'DC02.company.com'],
      logTypes: ['Logon Events', 'Account Management', 'Policy Changes'],
      config: {
        winlogbeat: 'enabled',
        eventLogs: ['Security', 'System', 'Application'],
        forwardingMode: 'WinRM'
      }
    },
    {
      id: 'crowdstrike',
      name: 'CrowdStrike Falcon',
      type: 'EDR',
      status: 'connected',
      lastSync: '15 seconds ago',
      logsPerDay: '450K',
      icon: Activity,
      description: 'Endpoint detection and response platform',
      endpoints: ['api.crowdstrike.com'],
      logTypes: ['Process Events', 'Network Connections', 'File Operations'],
      config: {
        clientId: 'cs_client_***',
        apiKey: '***************',
        baseUrl: 'https://api.crowdstrike.com',
        streamingApi: 'enabled'
      }
    },
    {
      id: 'threat-intel',
      name: 'Threat Intelligence Feeds',
      type: 'Threat Intel',
      status: 'warning',
      lastSync: '10 minutes ago',
      logsPerDay: '25K',
      icon: Globe,
      description: 'Multiple threat intelligence sources and IOC feeds',
      endpoints: ['MISP', 'AlienVault OTX', 'VirusTotal'],
      logTypes: ['IOCs', 'Malware Hashes', 'Suspicious IPs', 'Domains'],
      config: {
        misp: 'https://misp.company.com',
        otxApiKey: '***************',
        vtApiKey: '***************',
        updateInterval: '5m'
      }
    },
    {
      id: 'web-servers',
      name: 'Web Application Logs',
      type: 'Application',
      status: 'error',
      lastSync: '2 hours ago',
      logsPerDay: '680K',
      icon: Server,
      description: 'Apache/Nginx web server access and error logs',
      endpoints: ['web01.company.com', 'web02.company.com'],
      logTypes: ['Access Logs', 'Error Logs', 'Security Events'],
      config: {
        logFormat: 'combined',
        syslogForwarding: 'enabled',
        errorLogLevel: 'warn'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-emerald-600 bg-emerald-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'disconnected': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const mockDataStructure = {
    logEntry: {
      id: "log_001",
      timestamp: "2024-01-15T14:30:25.123Z",
      source: "auth.log",
      sourceHost: "DC01.company.com",
      type: "authentication",
      severity: "high",
      message: "Failed password for admin from 192.168.1.100 port 22 ssh2",
      rawLog: "Jan 15 14:30:25 DC01 sshd[1234]: Failed password for admin from 192.168.1.100 port 22 ssh2",
      parsedFields: {
        sourceIP: "192.168.1.100",
        destinationIP: "10.0.0.5",
        port: 22,
        user: "admin",
        action: "failed_login",
        protocol: "ssh",
        service: "sshd",
        pid: 1234
      },
      geoLocation: {
        country: "US",
        city: "New York",
        latitude: 40.7128,
        longitude: -74.0060
      },
      threatIntel: {
        type: "brute_force",
        confidence: 0.85,
        description: "Multiple failed login attempts detected",
        mitreTactic: "Credential Access",
        mitreId: "T1110",
        iocMatches: ["suspicious_ip_list", "known_attacker_ips"]
      },
      enrichment: {
        userRisk: "high",
        assetCriticality: "critical",
        businessUnit: "IT Infrastructure",
        dataClassification: "confidential"
      }
    },
    alert: {
      id: "ALT-001",
      ruleId: "RULE_BRUTE_FORCE_001",
      ruleName: "SSH Brute Force Detection",
      timestamp: "2024-01-15T14:30:25.123Z",
      title: "Brute Force Attack Detected",
      description: "Multiple failed SSH login attempts from external IP",
      severity: "high",
      status: "open",
      confidence: 0.92,
      falsePositiveRate: 0.05,
      sourceIP: "192.168.1.100",
      targetAssets: ["DC01.company.com", "web01.company.com"],
      affectedUsers: ["admin", "root"],
      threatType: "Credential Access",
      killChain: ["Initial Access", "Credential Access"],
      indicators: [
        "Multiple failed logins (>10 in 5 minutes)",
        "External IP address",
        "Administrative account targeted"
      ],
      timeline: [
        { time: "14:25:00", event: "First failed login attempt" },
        { time: "14:27:30", event: "Failed attempts increase to 5/min" },
        { time: "14:30:25", event: "Alert triggered (threshold exceeded)" }
      ],
      recommendedActions: [
        "Block source IP immediately",
        "Reset compromised account passwords",
        "Enable MFA for administrative accounts",
        "Review successful logins from this IP"
      ],
      automatedActions: [
        "IP blocked via firewall rule",
        "Account temporarily locked",
        "Incident ticket created: INC-2024-001"
      ],
      relatedLogs: ["log_001", "log_002", "log_003"],
      assignee: "analyst@company.com",
      escalationLevel: 2,
      sla: {
        responseTime: "15 minutes",
        resolutionTime: "4 hours",
        timeRemaining: "3h 45m"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Data Sources & Configuration</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md">
            <Plus className="h-4 w-4" />
            <span>Add Source</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-md">
            <Settings className="h-4 w-4" />
            <span>Global Config</span>
          </button>
        </div>
      </div>

      {/* Data Source Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Connected Sources</p>
              <p className="text-gray-900 text-xl font-bold">{dataSources.filter(s => s.status === 'connected').length}</p>
            </div>
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Logs/Day</p>
              <p className="text-gray-900 text-xl font-bold">5.5M</p>
            </div>
            <Database className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Warnings</p>
              <p className="text-gray-900 text-xl font-bold">{dataSources.filter(s => s.status === 'warning').length}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Errors</p>
              <p className="text-gray-900 text-xl font-bold">{dataSources.filter(s => s.status === 'error').length}</p>
            </div>
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Active Data Sources</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {dataSources.map((source) => (
              <div
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <source.icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="text-gray-900 font-medium">{source.name}</h4>
                      <p className="text-gray-600 text-sm">{source.type}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(source.status)}`}>
                    {getStatusIcon(source.status)}
                    <span>{source.status.toUpperCase()}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{source.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last sync: {source.lastSync}</span>
                  <span>{source.logsPerDay} logs/day</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Details */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Source Configuration</h3>
          </div>
          {selectedSource ? (
            <div className="p-4">
              {(() => {
                const source = dataSources.find(s => s.id === selectedSource);
                if (!source) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <source.icon className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{source.name}</h4>
                        <p className="text-gray-600">{source.type}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-700 text-sm mb-3">{source.description}</p>
                    </div>

                    <div>
                      <p className="text-gray-900 font-medium text-sm mb-2">Endpoints</p>
                      <div className="space-y-1">
                        {source.endpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Wifi className="h-3 w-3 text-green-500" />
                            <span className="text-gray-700 text-sm font-mono">{endpoint}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-900 font-medium text-sm mb-2">Log Types</p>
                      <div className="flex flex-wrap gap-2">
                        {source.logTypes.map((type, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border border-blue-200">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-900 font-medium text-sm mb-2">Configuration</p>
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <pre className="text-xs text-gray-700 font-mono">
                          {JSON.stringify(source.config, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Test Connection
                      </button>
                      <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a data source to view configuration</p>
            </div>
          )}
        </div>
      </div>

      {/* Mock Data Structure */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Data Structure Examples</h3>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <Eye className="h-4 w-4" />
              <span>View Raw Data</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 font-medium mb-3">Log Entry Structure</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap">
                  {JSON.stringify(mockDataStructure.logEntry, null, 2)}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-3">Alert Structure</h4>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-y-auto">
                <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap">
                  {JSON.stringify(mockDataStructure.alert, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Real Data Integration Guide</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-gray-900 font-medium mb-3">1. SIEM Integration</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Connect to Splunk REST API</li>
                <li>• Configure QRadar ARIEL queries</li>
                <li>• Set up Sentinel KQL queries</li>
                <li>• Use ELK Stack Elasticsearch API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-3">2. Real-time Streaming</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Syslog UDP/TCP listeners</li>
                <li>• Kafka message consumers</li>
                <li>• WebSocket connections</li>
                <li>• MQTT for IoT devices</li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-3">3. Threat Intel APIs</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• VirusTotal API integration</li>
                <li>• MISP threat sharing</li>
                <li>• Commercial feed APIs</li>
                <li>• Custom IOC databases</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;