import axios from 'axios';

const API_BASE_URL = 'https://flightontime.up.railway.app';

export interface PredictionRequest {
  aerolinea: string;
  origen: string;
  destino: string;
  fecha_partida: string;
  distancia_km: number;
}

export interface FormattedPrediction extends Omit<PredictionRequest, 'fecha_partida'> {
  day: number;
  month: number;
  year: number;
  time: number;
}

export interface PredictionResponse {
  prevision: 'Puntual' | 'Retrasado';
  probabilidad: number;
  timestamp: string;
  ruta: string;
}

export const predictFlight = async (data): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>(`${API_BASE_URL}/flights/predict`, data);
  return response.data;
};

// Mock function for development/demo purposes
export const mockPredictFlight = async (data): Promise<PredictionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock prediction based on some logic
  const hour = new Date(data.fecha_partida).getHours();
  const isRushHour = hour >= 6 && hour <= 9 || hour >= 17 && hour <= 20;
  const isLongDistance = data.distancia_km > 1000;
  
  // Higher chance of delay during rush hours and for long distances
  const delayProbability = (isRushHour ? 0.3 : 0.1) + (isLongDistance ? 0.2 : 0);
  const isDelayed = Math.random() < delayProbability + 0.2;
  
  return {
    prevision: isDelayed ? 'Retrasado' : 'Puntual',
    probabilidad: isDelayed ? 0.6 + Math.random() * 0.35 : 0.7 + Math.random() * 0.25,
    timestamp: new Date().toISOString(),
    ruta: `${data.origen} → ${data.destino}`,
  };
};
