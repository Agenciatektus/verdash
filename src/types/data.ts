
export interface DataSource {
  id: string;
  name: string;
  type: 'google_sheets' | 'meta_ads' | 'crm' | 'tintim' | 'csv' | 'webhook' | 'api';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  recordCount: number;
  config: {
    url?: string;
    apiKey?: string;
    sheetId?: string;
    range?: string;
    webhookUrl?: string;
    credentials?: any;
  };
  fields: DataField[];
  createdAt: string;
  updatedAt: string;
}

export interface DataField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  description?: string;
  isCalculated: boolean;
  formula?: string;
  sourceField?: string;
}

export interface CalculatedMetric {
  id: string;
  name: string;
  description: string;
  formula: string;
  type: 'currency' | 'percentage' | 'number' | 'ratio';
  dependencies: string[]; // IDs of fields/metrics this depends on
  category: 'marketing' | 'sales' | 'finance' | 'operations' | 'custom';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DataTransformation {
  id: string;
  sourceId: string;
  name: string;
  operations: TransformOperation[];
  outputFields: DataField[];
}

export interface TransformOperation {
  type: 'filter' | 'aggregate' | 'calculate' | 'join' | 'group';
  config: any;
}

export interface FormulaBuilder {
  expression: string;
  variables: FormulaVariable[];
  functions: FormulaFunction[];
  isValid: boolean;
  result?: number;
}

export interface FormulaVariable {
  id: string;
  name: string;
  value: number;
  type: 'field' | 'metric' | 'constant';
}

export interface FormulaFunction {
  name: string;
  description: string;
  syntax: string;
  example: string;
}
