-- Add product_recommendations column to existing skin_journey table
ALTER TABLE skin_journey ADD COLUMN IF NOT EXISTS product_recommendations JSONB;
