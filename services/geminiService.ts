import { GoogleGenAI, Type, Modality } from "@google/genai";
import { SkinAnalysisResult, Product } from '../types';

// Lazy initialization to prevent crashes on app load
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

// Helper function to convert File to a Gemini GenerativePart
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const analyzeSkin = async (imageFile: File, latitude: number | null, longitude: number | null): Promise<SkinAnalysisResult> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  let promptText = "Analyze the person's skin in this selfie. Identify their skin type (e.g., Oily, Dry, Combination, Normal, Sensitive) and list up to 3 primary skin concerns (e.g., Acne, Fine Lines, Hyperpigmentation, Redness, Pores).";
  
  if (latitude && longitude) {
      promptText += ` Also, provide skincare advice based on the current weather and environmental conditions for latitude ${latitude} and longitude ${longitude}. Consider factors like UV index, humidity, and pollution. The advice should be a concise paragraph.`
  } else {
      promptText += ` Also, provide general environmental skincare advice as the user's location is not available.`
  }

  const response = await getAI().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
        parts: [
            imagePart,
            { text: promptText }
        ]
    },
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                skinType: { type: Type.STRING },
                concerns: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                environmentalAdvice: { type: Type.STRING }
            },
            required: ['skinType', 'concerns', 'environmentalAdvice']
        }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};

interface RecommendationResponse {
    cleanser: Product;
    moisturizer: Product;
    serum: Product;
}

export const getRecommendations = async (analysisResult: SkinAnalysisResult): Promise<RecommendationResponse> => {
  const prompt = `Based on a skin analysis of skin type: ${analysisResult.skinType} and concerns: ${analysisResult.concerns.join(', ')}, recommend one cleanser, one moisturizer, and one serum. For each product, provide a generic name, a short description, and 3 key ingredients.`;
  
  const productSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    },
    required: ['name', 'description', 'ingredients']
  };

  const response = await getAI().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                cleanser: productSchema,
                moisturizer: productSchema,
                serum: productSchema,
            },
            required: ['cleanser', 'moisturizer', 'serum']
        }
    }
  });

  const result = JSON.parse(response.text);
  return result;
};