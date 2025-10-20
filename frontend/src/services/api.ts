import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export interface Detection {
  type: 'face' | 'text' | 'license_plate' | 'document';
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  text?: string;
}

export interface AnalysisResponse {
  success: boolean;
  detections: Detection[];
  riskAnalysis: {
    personalData: string;
    identityRisk: string;
    locationRisk: string;
  };
  explanation: string;
}

export const analyzeImage = async (imageFile: File): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append('image', imageFile); // Must match backend field name
  
  const response = await api.post<AnalysisResponse>('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};