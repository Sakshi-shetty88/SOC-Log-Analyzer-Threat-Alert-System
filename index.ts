export interface LogEntry {
  id: string;
  timestamp: Date;
  source: string;
  type: 'auth' | 'firewall' | 'system' | 'network' | 'application';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  sourceIP?: string;
  destinationIP?: string;
  port?: number;
  user?: string;
  action?: string;
  protocol?: string;
  bytesTransferred?: number;
  threat?: ThreatIndicator;
}

export interface ThreatIndicator {
  type: 'brute_force' | 'port_scan' | 'malware' | 'suspicious_login' | 'data_exfiltration' | 'ddos';
  confidence: number;
  description: string;
  mitreTactic?: string;
  mitreId?: string;
}

export interface Alert {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignee?: string;
  sourceIP?: string;
  affectedAssets: string[];
  threatType: string;
  indicators: string[];
  recommendedActions: string[];
  relatedLogs: string[];
}

export interface SecurityMetrics {
  totalLogs: number;
  alertsToday: number;
  criticalAlerts: number;
  resolvedIncidents: number;
  averageResponseTime: number;
  topThreats: { type: string; count: number; }[];
  timeSeriesData: { time: string; alerts: number; logs: number; }[];
}