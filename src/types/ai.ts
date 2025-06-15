
export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  severity: 'low' | 'medium' | 'high';
  source: string;
  timestamp: string;
  action?: string;
  metrics?: {
    current: number;
    previous: number;
    change: number;
    changeType: 'increase' | 'decrease';
  };
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'anomaly' | 'threshold' | 'trend';
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved' | 'dismissed';
  source: string;
  timestamp: string;
  threshold?: {
    value: number;
    operator: 'above' | 'below';
    metric: string;
  };
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  category: 'optimization' | 'cost-reduction' | 'growth' | 'retention';
  actions: string[];
  expectedResult: string;
  timestamp: string;
}

export interface AIReport {
  id: string;
  period: 'daily' | 'weekly' | 'monthly';
  title: string;
  summary: string;
  insights: Insight[];
  recommendations: AIRecommendation[];
  keyMetrics: {
    metric: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  generatedAt: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  context?: {
    metrics?: string[];
    timeframe?: string;
    project?: string;
  };
}
