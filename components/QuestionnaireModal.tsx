import React, { useState } from 'react';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Answers {
  skinType: string;
  concerns: string[];
  age: string;
  routine: string;
}

const QuestionnaireModal: React.FC<QuestionnaireModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    skinType: '',
    concerns: [],
    age: '',
    routine: '',
  });
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleSkinTypeSelect = (type: string) => {
    setAnswers({ ...answers, skinType: type });
    setStep(2);
  };

  const handleConcernToggle = (concern: string) => {
    const newConcerns = answers.concerns.includes(concern)
      ? answers.concerns.filter(c => c !== concern)
      : [...answers.concerns, concern];
    setAnswers({ ...answers, concerns: newConcerns });
  };

  const handleAgeSelect = (age: string) => {
    setAnswers({ ...answers, age });
    setStep(4);
  };

  const handleRoutineSelect = (routine: string) => {
    setAnswers({ ...answers, routine });
    setShowResults(true);
  };

  const getRecommendations = () => {
    const recommendations = {
      products: [] as string[],
      tips: [] as string[],
    };

    // Skin type based recommendations
    if (answers.skinType === 'dry') {
      recommendations.products.push('Hyaluronic Acid Serum', 'Rich Moisturizer', 'Gentle Cream Cleanser');
      recommendations.tips.push('Avoid hot water when cleansing', 'Use a humidifier at night');
    } else if (answers.skinType === 'oily') {
      recommendations.products.push('Salicylic Acid Cleanser', 'Oil-Free Moisturizer', 'Clay Mask');
      recommendations.tips.push('Cleanse twice daily', 'Use non-comedogenic products');
    } else if (answers.skinType === 'combination') {
      recommendations.products.push('Balanced Cleanser', 'Lightweight Moisturizer', 'Niacinamide Serum');
      recommendations.tips.push('Multi-mask different zones', 'Use targeted treatments');
    } else if (answers.skinType === 'sensitive') {
      recommendations.products.push('Gentle Cleanser', 'Fragrance-Free Moisturizer', 'Soothing Serum');
      recommendations.tips.push('Patch test new products', 'Avoid harsh exfoliants');
    }

    // Concern based recommendations
    if (answers.concerns.includes('acne')) {
      recommendations.products.push('BHA Exfoliant', 'Benzoyl Peroxide Treatment');
      recommendations.tips.push('Change pillowcases regularly', 'Avoid touching your face');
    }
    if (answers.concerns.includes('aging')) {
      recommendations.products.push('Retinol Serum', 'Vitamin C Serum', 'SPF 50');
      recommendations.tips.push('Wear sunscreen daily', 'Get adequate sleep');
    }
    if (answers.concerns.includes('dark-spots')) {
      recommendations.products.push('Vitamin C Serum', 'Alpha Arbutin', 'SPF 50');
      recommendations.tips.push('Always use sun protection', 'Be patient with treatments');
    }
    if (answers.concerns.includes('redness')) {
      recommendations.products.push('Centella Asiatica Serum', 'Calming Moisturizer');
      recommendations.tips.push('Avoid extreme temperatures', 'Use lukewarm water');
    }

    return recommendations;
  };

  const recommendations = showResults ? getRecommendations() : null;

  const resetQuestionnaire = () => {
    setStep(1);
    setAnswers({ skinType: '', concerns: [], age: '', routine: '' });
    setShowResults(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-light text-gray-900">
              {showResults ? 'Your Recommendations' : 'Skin Assessment'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          {!showResults && (
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Question {step} of 4</span>
                <span className="text-sm text-cyan-500">{Math.round((step / 4) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Questions */}
          {!showResults && (
            <>
              {/* Question 1: Skin Type */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">What's your skin type?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Dry', 'Oily', 'Combination', 'Sensitive'].map((type) => (
                      <button
                        key={type}
                        onClick={() => handleSkinTypeSelect(type.toLowerCase())}
                        className="p-6 border-2 border-gray-200 rounded-2xl hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 text-left group"
                      >
                        <div className="text-lg font-medium text-gray-900 group-hover:text-cyan-600">
                          {type}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Concerns */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">What are your main concerns?</h3>
                  <p className="text-sm text-gray-600 mb-6">Select all that apply</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { id: 'acne', label: 'Acne & Breakouts' },
                      { id: 'aging', label: 'Fine Lines & Wrinkles' },
                      { id: 'dark-spots', label: 'Dark Spots' },
                      { id: 'redness', label: 'Redness & Sensitivity' },
                    ].map((concern) => (
                      <button
                        key={concern.id}
                        onClick={() => handleConcernToggle(concern.id)}
                        className={`p-6 border-2 rounded-2xl transition-all duration-300 text-left ${
                          answers.concerns.includes(concern.id)
                            ? 'border-cyan-400 bg-cyan-50'
                            : 'border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-900">{concern.label}</span>
                          {answers.concerns.includes(concern.id) && (
                            <svg className="w-6 h-6 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    disabled={answers.concerns.length === 0}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Question 3: Age Range */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">What's your age range?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['18-25', '26-35', '36-45', '46+'].map((age) => (
                      <button
                        key={age}
                        onClick={() => handleAgeSelect(age)}
                        className="p-6 border-2 border-gray-200 rounded-2xl hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 text-left group"
                      >
                        <div className="text-lg font-medium text-gray-900 group-hover:text-cyan-600">
                          {age}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4: Current Routine */}
              {step === 4 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-medium text-gray-900 mb-6">Current skincare routine?</h3>
                  <div className="space-y-4">
                    {[
                      { id: 'minimal', label: 'Minimal', desc: 'Just cleanser and moisturizer' },
                      { id: 'basic', label: 'Basic', desc: 'Cleanser, toner, moisturizer, SPF' },
                      { id: 'advanced', label: 'Advanced', desc: 'Full routine with serums and treatments' },
                      { id: 'none', label: 'None', desc: 'Starting from scratch' },
                    ].map((routine) => (
                      <button
                        key={routine.id}
                        onClick={() => handleRoutineSelect(routine.id)}
                        className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-300 text-left group"
                      >
                        <div className="text-lg font-medium text-gray-900 group-hover:text-cyan-600 mb-1">
                          {routine.label}
                        </div>
                        <div className="text-sm text-gray-600">{routine.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Results */}
          {showResults && recommendations && (
            <div className="animate-fade-in">
              <div className="mb-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Based on your answers:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 capitalize">
                    {answers.skinType} skin
                  </span>
                  {answers.concerns.map((concern) => (
                    <span key={concern} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 capitalize">
                      {concern.replace('-', ' ')}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700">
                    {answers.age}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Recommended Products:</h4>
                <div className="space-y-3">
                  {recommendations.products.map((product, index) => (
                    <a
                      key={index}
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(product)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-cyan-50 hover:border-cyan-200 border-2 border-transparent transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 flex-1">{product}</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Expert Tips:</h4>
                <div className="space-y-3">
                  {recommendations.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetQuestionnaire}
                  className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-cyan-300 hover:bg-cyan-50/50 transition-all duration-300"
                >
                  Start Over
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-200/50 transition-all duration-300"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireModal;
