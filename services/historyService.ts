import { RecommendationHistory, SkinAnalysisResult, Product } from '../types';

const HISTORY_KEY = 'aura_recommendation_history';

export const saveRecommendation = (
  analysisResult: SkinAnalysisResult,
  recommendations: {
    cleanser: Product;
    moisturizer: Product;
    serum: Product;
  }
): void => {
  const history = getRecommendationHistory();

  const newEntry: RecommendationHistory = {
    id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    analysisResult,
    recommendations,
  };

  // Add to the beginning of the array (most recent first)
  history.unshift(newEntry);

  // Keep only the last 20 recommendations
  const limitedHistory = history.slice(0, 20);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
};

export const getRecommendationHistory = (): RecommendationHistory[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading recommendation history:', error);
    return [];
  }
};

export const deleteRecommendation = (id: string): void => {
  const history = getRecommendationHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
