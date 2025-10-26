import React from 'react';

interface FinalCTAProps {
  onStartAnalysis: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onStartAnalysis }) => {
  return (
    <div className="relative py-32 bg-gradient-to-b from-white via-cyan-50/40 to-blue-50/60 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 mb-6 animate-fade-in">
          Ready to Discover Your
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-light">
            Perfect Routine?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Join thousands of users discovering healthier, personalized skincare powered by Aura
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onStartAnalysis}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-200/50 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center">
              Start Analysis
              <svg
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-full hover:border-cyan-300 hover:bg-cyan-50/50 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
          >
            Shop Recommendations
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 font-light animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>10K+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
