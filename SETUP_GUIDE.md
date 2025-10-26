# Aura Skincare - Complete Setup Guide

This guide will walk you through setting up Aura Skincare with Supabase authentication.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in:
   - **Name**: Aura Skincare
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait ~2 minutes

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")

3. Add them to your `.env.local` file:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   GEMINI_API_KEY=your_gemini_key_here
   ```

## Step 3: Enable Email Authentication

1. In Supabase, go to **Authentication** → **Providers**
2. Find **Email** and make sure it's **enabled**
3. Scroll down to **Email Templates** (optional but recommended)
4. Customize your confirmation email template

## Step 4: Enable Google OAuth (Optional but Recommended)

### 4.1 Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client IDs**
5. Configure consent screen if prompted:
   - User Type: External
   - App name: Aura Skincare
   - User support email: your email
   - Developer contact: your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: Aura Skincare
   - Authorized redirect URIs: Add this EXACTLY:
     ```
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```
     (Replace YOUR_PROJECT_REF with your Supabase project ref from the URL)

7. Copy the **Client ID** and **Client Secret**

### 4.2 Configure Google in Supabase

1. Back in Supabase, go to **Authentication** → **Providers**
2. Find **Google** and toggle it **enabled**
3. Paste your:
   - **Client ID** (from Google)
   - **Client Secret** (from Google)
4. Click **Save**

## Step 5: Configure URL Settings

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Set:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add both:
     - `http://localhost:5173`
     - `https://your-production-domain.com` (when you deploy)

## Step 6: Install Dependencies

```bash
npm install
```

This installs:
- React 19
- Supabase JS client
- TypeScript
- Vite
- And all other dependencies

## Step 7: Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` and you should see:
1. ✅ Beautiful landing page
2. ✅ "Get Started" button
3. ✅ Authentication modal with email and Google sign-in

## Step 8: Test the Authentication Flow

### Test Email Sign-Up
1. Click "Get Started"
2. Click "Sign up"
3. Enter email and password
4. Click "Create account"
5. Check your email for confirmation
6. Click the confirmation link
7. You should be redirected and signed in!

### Test Google Sign-In
1. Click "Get Started"
2. Click "Continue with Google"
3. Select your Google account
4. You should be signed in automatically!

## Step 9: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
4. Deploy!

5. Update Supabase URL Configuration:
   - Add your Vercel URL to **Redirect URLs**
   - Update **Site URL** to your production URL

6. Update Google OAuth:
   - Add your Vercel URL to **Authorized redirect URIs**:
     ```
     https://your-app.vercel.app
     ```

## Troubleshooting

### "Invalid login credentials" error
- Make sure you confirmed your email
- Check that Email provider is enabled in Supabase
- Try resetting your password

### Google OAuth not working
- Double-check the redirect URI matches exactly
- Make sure Google provider is enabled in Supabase
- Check Client ID and Secret are correct

### Environment variables not working
- Make sure `.env.local` exists and has correct values
- Restart the dev server after changing env vars
- Variables must start with `VITE_` to be accessible in the app

### "Missing Supabase environment variables" error
- Check that `.env.local` exists
- Verify variable names are exact:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- No quotes needed around values in `.env.local`

## Next Steps

Now that authentication is working:

1. **Customize the design** - Edit colors, fonts, spacing in components
2. **Add user profiles** - Create a profiles table in Supabase
3. **Save analysis history** - Store past analyses for each user
4. **Add more OAuth providers** - GitHub, Facebook, etc.
5. **Set up analytics** - Track user behavior
6. **Add payment** - Integrate Stripe for premium features

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

Questions? Open an issue on GitHub!
