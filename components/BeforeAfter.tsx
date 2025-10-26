import React, { useState } from 'react';

const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-4">
            See the <span className="text-cyan-500">Aura Difference</span>
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            AI-driven analysis transforms your skincare into precision beauty.
          </p>
        </div>

        {/* Before/After Slider */}
        <div
          className="relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {/* Before Image */}
          <div className="w-full aspect-[4/3] relative select-none">
            <img
              src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=600&fit=crop&auto=format"
              alt="Before analysis"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-700">Before</span>
            </div>
          </div>

          {/* After Image (Clipped) */}
          <div
            className="absolute inset-0 select-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop&auto=format"
              alt="After analysis"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-6 right-6 bg-cyan-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-white">After</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl font-light text-cyan-500 mb-2">95%</div>
            <p className="text-gray-600 font-light">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-cyan-500 mb-2">2 Min</div>
            <p className="text-gray-600 font-light">Analysis Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-cyan-500 mb-2">100K+</div>
            <p className="text-gray-600 font-light">Skin Scans</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
