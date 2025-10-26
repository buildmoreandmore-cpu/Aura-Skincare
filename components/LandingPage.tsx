import React, { useState } from 'react';
import Testimonials from './Testimonials';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-8 animate-fade-in">
          <div className="flex items-center">
            <span className="text-2xl font-light tracking-tight text-gray-900">Aura</span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="mt-20 md:mt-32 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-gray-900 leading-tight">
            Your skin,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-light">
              scientifically analyzed
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            Advanced AI technology meets personalized skincare.
            <br />
            Discover your perfect routine in seconds.
          </p>

          <button
            onClick={onGetStarted}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-12 group relative inline-flex items-center justify-center px-12 py-5 text-lg font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-200/50"
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <svg
                className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-32 grid md:grid-cols-3 gap-8 pb-32 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Feature 1 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Advanced algorithms analyze your skin type, concerns, and environmental factors for precise recommendations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Personalized Products</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Receive curated product recommendations tailored specifically to your unique skin profile and needs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Environmental Insights</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Location-based recommendations that account for climate, pollution, and seasonal changes.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Decorative gradient orbs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
    </div>
  );
};

export default LandingPage;
