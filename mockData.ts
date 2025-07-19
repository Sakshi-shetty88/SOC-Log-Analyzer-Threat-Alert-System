import { LogEntry, Alert, SecurityMetrics } from '../types';

const generateRandomIP = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const generateTimestamp = (hoursAgo: number) => {
  const now = new Date();
  return new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
};

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: generateTimestamp(0.5),
    source: 'auth.log',
    type: 'auth',
    severity: 'high',
    message: 'Failed password for admin from 192.168.1.100 port 22 ssh2',
    sourceIP: '192.168.1.100',
    port: 22,
    user: 'admin',
    action: 'failed_login',
    threat: {
      type: 'brute_force',
      confidence: 0.85,
      description: 'Multiple failed login attempts detected',
      mitreTactic: 'Credential Access',
      mitreId: 'T1110'
    }
  },
  {
    id: '2',
    timestamp: generateTimestamp(1),
    source: 'firewall.log',
    type: 'firewall',
    severity: 'medium',
    message: 'Connection attempt blocked from 203.0.113.45 to 10.0.0.5:3389',
    sourceIP: '203.0.113.45',
    destinationIP: '10.0.0.5',
    port: 3389,
    action: 'blocked',
    protocol: 'TCP'
  },
  {
    id: '3',
    timestamp: generateTimestamp(2),
    source: 'system.log',
    type: 'system',
    severity: 'critical',
    message: 'Suspicious process execution detected: powershell.exe -encodedCommand',
    threat: {
      type: 'malware',
      confidence: 0.92,
      description: 'Encoded PowerShell execution detected',
      mitreTactic: 'Execution',
      mitreId: 'T1059.001'
    }
  },
  {
    id: '4',
    timestamp: generateTimestamp(3),
    source: 'network.log',
    type: 'network',
    severity: 'high',
    message: 'Port scan detected from 198.51.100.23 scanning ports 21-23, 25, 53, 80, 110, 443',
    sourceIP: '198.51.100.23',
    threat: {
      type: 'port_scan',
      confidence: 0.78,
      description: 'Sequential port scanning activity detected',
      mitreTactic: 'Discovery',
      mitreId: 'T1046'
    }
  },
  {
    id: '5',
    timestamp: generateTimestamp(4),
    source: 'auth.log',
    type: 'auth',
    severity: 'medium',
    message: 'Successful login for user john from 10.0.0.15 port 22 ssh2',
    sourceIP: '10.0.0.15',
    port: 22,
    user: 'john',
    action: 'successful_login'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    timestamp: generateTimestamp(0.5),
    title: 'Brute Force Attack Detected',
    description: 'Multiple failed login attempts from 192.168.1.100 targeting admin account',
    severity: 'high',
    status: 'open',
    sourceIP: '192.168.1.100',
    affectedAssets: ['web-server-01', 'admin-portal'],
    threatType: 'Brute Force',
    indicators: ['Multiple failed logins', 'Admin account targeted', 'External IP'],
    recommendedActions: [
      'Block source IP immediately',
      'Reset admin password',
      'Enable MFA for admin accounts',
      'Review access logs for successful logins'
    ],
    relatedLogs: ['1', '6', '7']
  },
  {
    id: 'ALT-002',
    timestamp: generateTimestamp(2),
    title: 'Malware Execution Detected',
    description: 'Suspicious encoded PowerShell execution on workstation WS-045',
    severity: 'critical',
    status: 'investigating',
    assignee: 'analyst@company.com',
    affectedAssets: ['WS-045'],
    threatType: 'Malware',
    indicators: ['Encoded PowerShell', 'Suspicious process', 'System changes'],
    recommendedActions: [
      'Isolate affected workstation',
      'Run full antivirus scan',
      'Analyze PowerShell script',
      'Check for lateral movement'
    ],
    relatedLogs: ['3', '8', '9']
  },
  {
    id: 'ALT-003',
    timestamp: generateTimestamp(3),
    title: 'Port Scanning Activity',
    description: 'Reconnaissance activity detected from external IP',
    severity: 'medium',
    status: 'resolved',
    sourceIP: '198.51.100.23',
    affectedAssets: ['DMZ-servers'],
    threatType: 'Reconnaissance',
    indicators: ['Sequential port scans', 'External IP', 'Multiple services'],
    recommendedActions: [
      'Block scanning IP',
      'Review firewall rules',
      'Monitor for follow-up attacks'
    ],
    relatedLogs: ['4']
  }
];

export const mockMetrics: SecurityMetrics = {
  totalLogs: 15847,
  alertsToday: 23,
  criticalAlerts: 3,
  resolvedIncidents: 18,
  averageResponseTime: 12.5,
  topThreats: [
    { type: 'Brute Force', count: 8 },
    { type: 'Malware', count: 5 },
    { type: 'Port Scan', count: 4 },
    { type: 'Phishing', count: 3 },
    { type: 'DDoS', count: 2 }
  ],
  timeSeriesData: [
    { time: '00:00', alerts: 2, logs: 156 },
    { time: '04:00', alerts: 1, logs: 89 },
    { time: '08:00', alerts: 5, logs: 234 },
    { time: '12:00', alerts: 8, logs: 421 },
    { time: '16:00', alerts: 4, logs: 287 },
    { time: '20:00', alerts: 3, logs: 195 }
  ]
};