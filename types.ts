// Fix: Define and export types used throughout the application.
export type MarketingMedium = string;

export interface DefaultImage {
  name: string;
  url: string;
}

export interface StylePreset {
  name: string;
  prompt: string;
}

export interface ImageData {
  base64: string;
  mimeType: string;
}

export interface GeneratedCreation {
  id: string;
  medium: MarketingMedium;
  history: ImageData[];
  historyIndex: number;
}

// --- Text Overlay Types ---
export type TextAlignment = 'top left' | 'top center' | 'top right' | 'middle left' | 'center' | 'middle right' | 'bottom left' | 'bottom center' | 'bottom right';
export type TextSize = 'small' | 'medium' | 'large';
export type TextColor = 'white' | 'black' | 'red' | 'blue' | 'yellow';

export interface TextOption<T> {
  name: string;
  value: T;
}

export interface TextColorOption extends TextOption<TextColor> {
  className: string;
}

export interface TextAlignmentOption extends TextOption<TextAlignment> {
  icon: React.FC<{ className?: string }>;
}