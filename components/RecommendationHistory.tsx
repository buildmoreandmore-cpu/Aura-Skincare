import React, { useState, useEffect } from 'react';
import { RecommendationHistory } from '../types';
import { getRecommendationHistory, deleteRecommendation, clearHistory } from '../services/historyService';

const RecommendationHistoryComponent: React.FC = () => {
  const [history, setHistory] = useState<RecommendationHistory[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getRecommendationHistory());
  };

  const handleDelete = (id: string) => {
    deleteRecommendation(id);
    loadHistory();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      loadHistory();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (history.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="text-center p-12 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700">No History Yet</h2>
          <p className="mt-2 text-gray-600">
            Your recommendation history will appear here after you complete your first skin analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Recommendation History</h2>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in"
          >
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpanded(entry.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 text-sm font-medium rounded-full mr-2">
                      {entry.analysisResult.skinType}
                    </span>
                    {entry.analysisResult.concerns.map((concern, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mr-2 mb-2"
                      >
                        {concern}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                  >
                    Delete
                  </button>
                  <span className="text-gray-400">
                    {expandedId === entry.id ? '▲' : '▼'}
                  </span>
                </div>
              </div>
            </div>

            {expandedId === entry.id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Environmental Advice:</h4>
                  <p className="text-gray-600 text-sm">{entry.analysisResult.environmentalAdvice}</p>
                </div>

                <h4 className="font-semibold text-gray-700 mb-4">Recommended Products:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['cleanser', 'moisturizer', 'serum'].map((type) => {
                    const product = entry.recommendations[type as keyof typeof entry.recommendations];
                    return (
                      <div key={type} className="bg-white rounded-lg p-4 shadow">
                        <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">
                          {type}
                        </p>
                        <h5 className="mt-1 font-bold text-gray-900">{product.name}</h5>
                        <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-500">Key Ingredients:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.ingredients.map((ing, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-cyan-50 text-cyan-800 text-xs rounded-full"
                              >
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationHistoryComponent;
