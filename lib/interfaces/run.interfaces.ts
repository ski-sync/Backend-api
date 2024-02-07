export interface Run {
  id: string;
  userId: string;
  runId: string;
  points: Point[];
}

export interface Point {
  humidity: number;
  temperature: number;
  pressure: number;
  altitude: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface ExportPoint {
  [timestamp: string]: [humidity: number, temperature: number, pressure: number, altitude: number, latitude: number, longitude: number];
}

export interface ExportRun {
  points: ExportPoint[];
}
