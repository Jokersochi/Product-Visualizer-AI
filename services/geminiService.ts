import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { ImageData, MarketingMedium } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateContent = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<ImageData> => {
  const model = 'gemini-2.5-flash-image';
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

  if (imagePart && imagePart.inlineData) {
    return {
      base64: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    };
  }
  
  throw new Error("Failed to generate image from the response.");
};


export const generateMarketingImage = async (
  image: ImageData,
  medium: MarketingMedium
): Promise<ImageData> => {
  const prompt = `Visualize this product on a ${medium.toLowerCase()}. Maintain the product's appearance and branding.`;
  return generateContent(image.base64, image.mimeType, prompt);
};

export const editImage = async (
  image: ImageData,
  editPrompt: string,
  negativePrompt?: string
): Promise<ImageData> => {
  let fullPrompt = editPrompt;
  if (negativePrompt && negativePrompt.trim()) {
    fullPrompt += `. IMPORTANT: Do NOT include the following elements: ${negativePrompt.trim()}.`;
  }
  return generateContent(image.base64, image.mimeType, fullPrompt);
};

export const removeImageBackground = async (image: ImageData): Promise<ImageData> => {
    const prompt = "Remove the background of this image. Make the background transparent. The output should be a PNG with a transparent background showing only the main subject.";
    return generateContent(image.base64, image.mimeType, prompt);
};
