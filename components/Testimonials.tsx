import React from 'react';

const Testimonials: React.FC = () => {
  const portraits = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&auto=format",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=800&fit=crop&auto=format",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=600&h=800&fit=crop&auto=format",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop&auto=format",
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full" />
            <span className="text-sm font-light text-cyan-600 uppercase tracking-wider">
              Skin Focused
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-4">
            Made Specifically for{' '}
            <span className="text-cyan-500">Skincare</span>
          </h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Aura is designed from the ground up to perfect skin analysis with exceptional
            <br />
            attention to facial details
          </p>
        </div>

        {/* Portrait Grid - No Captions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {portraits.map((portrait, index) => (
            <div
              key={portrait.id}
              className="group relative overflow-hidden rounded-3xl aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={portrait.image}
                alt={`Portrait ${portrait.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
