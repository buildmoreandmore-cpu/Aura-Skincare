import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How does Aura's AI skin analysis work?",
      answer: "Aura uses advanced AI technology powered by Google's Gemini to analyze your skin from a photo. It identifies your skin type, detects concerns like dryness, acne, or aging, and considers environmental factors based on your location to provide personalized recommendations."
    },
    {
      id: 2,
      question: "Is my data secure and private?",
      answer: "Absolutely. Your photos and personal data are encrypted and stored securely with Supabase. We never share your information with third parties, and you can delete your data at any time. Your privacy is our top priority."
    },
    {
      id: 3,
      question: "What kind of recommendations will I receive?",
      answer: "You'll receive personalized product recommendations tailored to your specific skin type and concerns. We also provide environmental insights based on your location, considering factors like climate, humidity, and pollution that affect your skin."
    },
    {
      id: 4,
      question: "How accurate is the skin analysis?",
      answer: "Our AI has been trained on thousands of skin images and dermatological data to provide highly accurate analysis. However, for serious skin conditions, we always recommend consulting with a dermatologist for professional medical advice."
    },
    {
      id: 5,
      question: "Do I need to create an account to use Aura?",
      answer: "Yes, creating an account allows us to save your analysis history and track your skin's progress over time. You can sign up quickly with your email or use Google sign-in for instant access."
    },
    {
      id: 6,
      question: "Is Aura free to use?",
      answer: "Yes! Aura's core features including AI skin analysis and personalized recommendations are completely free. We believe everyone deserves access to quality skincare guidance."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-gray-600 font-light">
            Everything you need to know about Aura
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-cyan-200 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors duration-200 hover:bg-gray-50/50"
              >
                <span className="text-lg font-medium text-gray-900 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-cyan-500 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-gray-600 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-600 font-light mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:hello@aura-skincare.com"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
          >
            Contact our support team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
