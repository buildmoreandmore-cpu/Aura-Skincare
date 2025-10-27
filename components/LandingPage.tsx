import React, { useState } from 'react';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import QuestionnaireModal from './QuestionnaireModal';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative min-h-screen">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=1920&h=1080&fit=crop&auto=format"
            alt="Editorial beauty aesthetic"
            className="w-full h-full object-cover opacity-35 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/45 to-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-8 animate-fade-in">
            <div className="flex items-center">
              <span className="text-2xl font-light tracking-tight text-gray-900">Aura</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-cyan-300 rounded-full transition-all duration-300 hover:shadow-md hover:shadow-cyan-100 bg-white/80 backdrop-blur-sm"
            >
              Sign In
            </button>
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
        <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-32 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Feature 1 - AI Skin Scan */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">AI Skin Scan</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Instantly identify skin type and texture.
            </p>
          </div>

          {/* Feature 2 - Smart Recommendations */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Smart Recommendations</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Curated routines powered by data.
            </p>
          </div>

          {/* Feature 3 - Real-Time Tracking */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Real-Time Tracking</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Monitor hydration and glow over time.
            </p>
          </div>

          {/* Feature 4 - Adaptive Learning */}
          <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/50 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Adaptive Learning</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Aura evolves as your skin does.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <FinalCTA onStartAnalysis={onGetStarted} />

      {/* Decorative gradient orbs */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Questionnaire Modal */}
      <QuestionnaireModal isOpen={showQuestionnaire} onClose={() => setShowQuestionnaire(false)} />
    </div>
  );
};

export default LandingPage;
