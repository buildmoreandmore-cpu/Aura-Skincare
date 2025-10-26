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

export interface RecommendationHistory {
  id: string;
  timestamp: number;
  analysisResult: SkinAnalysisResult;
  recommendations: {
    cleanser: Product;
    moisturizer: Product;
    serum: Product;
  };
}

export type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

export type Tab = 'analysis' | 'recommendations' | 'history';