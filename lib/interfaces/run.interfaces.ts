export interface  Run {
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
    timestamp: number;
}