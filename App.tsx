import React, { useState } from 'react';
import Header from './components/Header';
import SkinAnalysis from './components/SkinAnalysis';
import ProductRecommendations from './components/ProductRecommendations';
import RecommendationHistory from './components/RecommendationHistory';
import { Tab, SkinAnalysisResult } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analysis');
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: SkinAnalysisResult) => {
    setAnalysisResult(result);
    setActiveTab('recommendations'); // Switch to recommendations tab after analysis
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

export default App;