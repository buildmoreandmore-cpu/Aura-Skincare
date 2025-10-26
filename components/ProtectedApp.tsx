import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import SkinAnalysis from './SkinAnalysis';
import ProductRecommendations from './ProductRecommendations';
import RecommendationHistory from './RecommendationHistory';
import { Tab, SkinAnalysisResult } from '../types';

const ProtectedApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analysis');
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);
  const { user } = useAuth();

  const handleAnalysisComplete = (result: SkinAnalysisResult) => {
    setAnalysisResult(result);
    setActiveTab('recommendations');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis':
        return <SkinAnalysis onAnalysisComplete={handleAnalysisComplete} />;
      case 'recommendations':
        return <ProductRecommendations analysisResult={analysisResult} />;
      case 'history':
        return <RecommendationHistory />;
      default:
        return <SkinAnalysis onAnalysisComplete={handleAnalysisComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default ProtectedApp;
