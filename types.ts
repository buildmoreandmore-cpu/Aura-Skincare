export interface SkinAnalysisResult {
  skinType: string;
  concerns: string[];
  environmentalAdvice: string;
}

export interface Product {
  name: string;
  description: string;
  ingredients: string[];
}

export type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

export type Tab = 'analysis' | 'recommendations';