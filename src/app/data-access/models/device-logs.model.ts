export interface DevicesLogResponse {
  deviceId: string;
  messages: LogMessages[];
}

export interface LogMessages {
  time: string;
  seqNumber: number;
  deviceLog: devicesLog[];
}

export interface devicesLog {
  dataGroup: string;
  dataGroupAttributes: devicesLogDetails[];
}

export interface devicesLogDetails {
  attribute: string;
  attributeValue: string;
  attributeType:string
}

export interface HistoryData {
  Data: string[];
  'Sequence #': number;
  Type: string;
  Action: string;
  Date: string;
}

export interface LastStatus {
  data: string;
  value: string;
  date: string;
}

export interface sChartData {
  chart_name: string;
  data: any[];
}
