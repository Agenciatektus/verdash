
export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: {
    dashboards: number;
    dataSources: number;
    teamUsers: number;
    clients: number;
    aiFeatures: boolean;
    whiteLabel: boolean;
    interactiveLinks: boolean;
    prioritySupport: boolean;
    customMetrics: boolean;
    reportAutomation: boolean;
    onboarding: string;
    apiConfiguration: string;
    support: string;
  };
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
}

export interface Usage {
  dashboards: number;
  dataSources: number;
  teamUsers: number;
  clients: number;
}

export interface BillingHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  invoiceUrl?: string;
  description: string;
}
