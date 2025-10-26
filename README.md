# Aura Skincare - AI-Powered Skin Analysis

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A beautiful, minimalist skincare analysis application powered by AI. Get personalized product recommendations based on your skin type, concerns, and environmental factors.

## Features

- 🎨 **Minimalist Design** - Clean, high-end aesthetic inspired by Apple and Enhancor.ai
- 🔐 **Supabase Authentication** - Secure sign-in with email/password and Google OAuth
- 🤖 **AI-Powered Analysis** - Advanced skin analysis using Google's Gemini AI
- 🌍 **Environmental Insights** - Location-based recommendations
- 💅 **Smooth Animations** - Elegant transitions and hover effects
- 📱 **Responsive Design** - Perfect on all devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A Supabase account
- A Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/buildmoreandmore-cpu/Aura-Skincare.git
   cd Aura-Skincare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env.local`:
   ```env
   # Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here

   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)

2. Get your project URL and anon key from:
   - Settings → API → Project URL
   - Settings → API → Project API keys → anon/public

3. Enable Email and Google authentication:
   - Authentication → Providers → Email (enable)
   - Authentication → Providers → Google (enable and configure)

4. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   - Copy Client ID and Secret to Supabase

### Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## Architecture

- **Landing Page** - Beautiful hero section with feature cards
- **Auth Modal** - Elegant sign-in/sign-up with Google OAuth
- **Protected App** - Main application gated by authentication
  - Skin Analysis tab
  - Product Recommendations tab
- **Supabase Auth** - Handles all authentication flows

## Design System

- **Colors**: White, light blue (#67E8F9), turquoise (#22D3EE)
- **Typography**: Inter font with light weights (300-600)
- **Borders**: Rounded (rounded-2xl, rounded-3xl)
- **Animations**: Fade-in, slide-up, glow effects
- **Shadows**: Subtle with cyan tints

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Authentication)
- Google Gemini AI
- Geolocation API

## Project Structure

```
Aura-Skincare/
├── components/
│   ├── AuthModal.tsx          # Sign-in/sign-up modal
│   ├── LandingPage.tsx        # Landing page
│   ├── ProtectedApp.tsx       # Main app (protected)
│   ├── Header.tsx             # Navigation header
│   ├── SkinAnalysis.tsx       # Skin analysis interface
│   └── ProductRecommendations.tsx
├── contexts/
│   └── AuthContext.tsx        # Auth state management
├── lib/
│   └── supabase.ts           # Supabase client
├── services/
│   └── geminiService.ts      # AI service
├── App.tsx                    # Main app component
└── index.tsx                  # Entry point
```

## Deployment

Deploy to Vercel:

```bash
npm run build
vercel deploy
```

Don't forget to add your environment variables in Vercel project settings!

## View Your App in AI Studio

https://ai.studio/apps/drive/19TyHjS1gw4wIwiA-fcAYNi4Y-ErwBpH4

## License

MIT

---

Built with ❤️ using Claude Code
