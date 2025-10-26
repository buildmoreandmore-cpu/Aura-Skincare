-- Create skin_journey table
CREATE TABLE IF NOT EXISTS skin_journey (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  analysis_result JSONB,
  product_recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_skin_journey_user_id ON skin_journey(user_id);
CREATE INDEX IF NOT EXISTS idx_skin_journey_created_at ON skin_journey(created_at DESC);

-- Enable Row Level Security
ALTER TABLE skin_journey ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own journey"
  ON skin_journey FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journey"
  ON skin_journey FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journey"
  ON skin_journey FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for skin photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('skin-photos', 'skin-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Users can upload their own photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'skin-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'skin-photos');

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'skin-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
