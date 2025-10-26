import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Skincare Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format",
      quote: "Aura completely transformed my skincare routine. The AI analysis was incredibly accurate and the personalized recommendations actually work.",
      rating: 5
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      role: "Beauty Blogger",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
      quote: "Finally, a skincare app that understands my skin type. The environmental insights based on my location are a game-changer.",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica Park",
      role: "Wellness Coach",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format",
      quote: "I've tried countless products, but Aura's AI-powered analysis helped me find exactly what my skin needs. My complexion has never looked better.",
      rating: 5
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white via-cyan-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-4">
            Loved by thousands
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Real results from real people
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 hover:border-cyan-200 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-100/30 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-cyan-100/50 group-hover:ring-cyan-200 transition-all duration-300">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover filter brightness-105 contrast-105"
                    style={{
                      filter: 'blur(0px) brightness(1.05) contrast(1.05) saturate(1.1)'
                    }}
                  />
                </div>
                {/* Soft glow effect */}
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/30 blur-xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-center">
                "{testimonial.quote}"
              </blockquote>

              {/* Name and Role */}
              <div className="text-center border-t border-gray-100 pt-6">
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500 font-light mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 font-light text-lg">
            Join thousands discovering their perfect skincare routine
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
