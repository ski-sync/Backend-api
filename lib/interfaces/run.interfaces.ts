export interface Run {
  id: string;
  userId: string;
  runId: string;
  points: ExportPoint[];
}

export interface ExportPoint {
  humidity: number;
  temperature: number;
  pressure: number;
  altitude: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface ExportRun {
  points: ExportPoint[];
}
