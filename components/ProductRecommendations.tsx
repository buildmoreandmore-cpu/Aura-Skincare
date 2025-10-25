import React, { useState, useEffect } from 'react';
import { getRecommendations } from '../services/geminiService';
import { SkinAnalysisResult, Product } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface ProductRecommendationsProps {
  analysisResult: SkinAnalysisResult | null;
}

interface Recommendations {
  cleanser: Product;
  moisturizer: Product;
  serum: Product;
}

const ProductCard: React.FC<{ title: string, product: Product }> = ({ title, product }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
    <div className="p-6">
      <p className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-gray-900">{product.name}</h3>
      <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
      <div className="mt-4">
        <h4 className="font-semibold text-xs text-gray-500">Key Ingredients:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
            {product.ingredients.map((ing, index) => (
                <span key={index} className="px-3 py-1 bg-cyan-50 text-cyan-800 text-xs font-medium rounded-full">{ing}</span>
            ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ analysisResult }) => {
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (analysisResult) {
      setLoading(true);
      setError(null);
      setRecommendations(null);
      getRecommendations(analysisResult)
        .then(setRecommendations)
        .catch(err => {
            console.error(err);
            setError('Could not fetch recommendations. Please try again.');
        })
        .finally(() => setLoading(false));
    }
  }, [analysisResult]);

  if (!analysisResult) {
    return (
      <div className="text-center p-8 md:p-12">
        <h2 className="text-2xl font-bold text-gray-700">Ready for your routine?</h2>
        <p className="mt-2 text-gray-600">Complete the Skin Analysis tab first to get your personalized product recommendations.</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 p-8">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Your Personalized Routine</h2>
            <p className="mt-2 text-lg text-gray-600">Products selected just for your skin.</p>
        </div>
        {recommendations && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProductCard title="Cleanser" product={recommendations.cleanser} />
                <ProductCard title="Moisturizer" product={recommendations.moisturizer} />
                <ProductCard title="Serum" product={recommendations.serum} />
             </div>
        )}
    </div>
  );
};

export default ProductRecommendations;
