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

const ProductCard: React.FC<{ title: string, product: Product, usage: string }> = ({ title, product, usage }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in hover:shadow-2xl transition-shadow duration-300">
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
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-xs text-gray-700 mb-1">How to Use:</h4>
        <p className="text-sm text-gray-600">{usage}</p>
      </div>
      <a
        href={`https://www.amazon.com/s?k=${encodeURIComponent(product.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-white text-center font-medium py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-200/50 transition-all duration-300"
      >
        Shop on Amazon
      </a>
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
    <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Your Personalized Routine</h2>
            <p className="mt-2 text-lg text-gray-600">Products selected just for your skin.</p>
        </div>

        {/* Skin Analysis Summary */}
        <div className="mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Skin Analysis Summary</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-600 mb-2">Skin Type</h4>
              <p className="text-lg text-gray-700">{analysisResult.skinType}</p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-600 mb-2">Main Concerns</h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.concerns.map((concern, index) => (
                  <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm font-medium rounded-full border border-cyan-200">
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {analysisResult.environmentalAdvice && (
            <div className="mt-4 pt-4 border-t border-cyan-200">
              <h4 className="font-semibold text-cyan-600 mb-2">Environmental Care Tips</h4>
              <p className="text-gray-700">{analysisResult.environmentalAdvice}</p>
            </div>
          )}
        </div>

        {recommendations && (
          <>
            {/* Product Recommendations */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProductCard
                  title="Cleanser"
                  product={recommendations.cleanser}
                  usage="Apply morning and evening. Wet face, massage gently in circular motions, rinse with lukewarm water."
                />
                <ProductCard
                  title="Serum"
                  product={recommendations.serum}
                  usage="Apply after cleansing, before moisturizer. Use 2-3 drops, pat gently into skin. Best used in the evening."
                />
                <ProductCard
                  title="Moisturizer"
                  product={recommendations.moisturizer}
                  usage="Apply as final step morning and night. Use upward motions. Don't forget your neck!"
                />
              </div>
            </div>

            {/* Routine Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Daily Routine</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-cyan-600 mb-3">Morning Routine ☀️</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">1.</span>
                      <span>Cleanse with {recommendations.cleanser.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">2.</span>
                      <span>Apply {recommendations.serum.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">3.</span>
                      <span>Moisturize with {recommendations.moisturizer.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">4.</span>
                      <span>Apply SPF 30+ sunscreen</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-cyan-600 mb-3">Evening Routine 🌙</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">1.</span>
                      <span>Remove makeup (if applicable)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">2.</span>
                      <span>Cleanse with {recommendations.cleanser.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">3.</span>
                      <span>Apply {recommendations.serum.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-cyan-500 mr-2">4.</span>
                      <span>Moisturize with {recommendations.moisturizer.name}</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default ProductRecommendations;
