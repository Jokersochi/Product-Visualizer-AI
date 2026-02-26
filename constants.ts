import { MarketingMedium, DefaultImage, StylePreset, TextSize, TextColorOption, TextAlignmentOption, TextOption } from './types';
import {
  AlignTopLeftIcon, AlignTopCenterIcon, AlignTopRightIcon,
  AlignMiddleLeftIcon, AlignCenterIcon, AlignMiddleRightIcon,
  AlignBottomLeftIcon, AlignBottomCenterIcon, AlignBottomRightIcon
} from './components/icons';

export const MARKETING_MEDIUMS: MarketingMedium[] = [
  'Coffee Mug',
  'Billboard',
  'T-Shirt',
  'Shopping Bag',
  'Cap',
  'Poster',
];

export const DEFAULT_IMAGES: DefaultImage[] = [
  { 
    name: 'Soda Can', 
    url: '/soda-can.png' 
  },
  { 
    name: 'Lotion Bottle', 
    url: '/lotion-bottle.png' 
  },
  { 
    name: 'Classic Sneaker', 
    url: '/sneaker.png' 
  },
  {
    name: 'Wrist Watch',
    url: '/watch.png'
  },
  {
    name: 'Headphones',
    url: '/headphones.png'
  }
];

export const STYLE_PRESETS: StylePreset[] = [
    { name: 'Vintage', prompt: 'Apply a vintage, sepia-toned filter with a grainy texture.' },
    { name: 'Neon', prompt: 'Give the image a futuristic, neon-lit aesthetic with glowing edges.' },
    { name: 'Minimalist', prompt: 'Place the product in a clean, minimalist setting with soft shadows and a neutral background.' },
    { name: 'Watercolor', prompt: 'Transform the image to have a soft, artistic watercolor painting style.' },
    { name: 'Pop Art', prompt: 'Convert the image into a bold, colorful Pop Art style, reminiscent of Andy Warhol.' },
    { name: 'Sketch', prompt: 'Redraw the image as a detailed pencil sketch with cross-hatching shadows.' },
    { name: 'Cyberpunk', prompt: 'Reimagine the image in a high-tech, dystopian cyberpunk environment with neon signs.' },
    { name: 'Photorealistic', prompt: 'Make the image hyper-realistic, with detailed textures, lighting, and reflections.' },
];

// --- Text Overlay Constants ---

export const TEXT_SIZES: TextOption<TextSize>[] = [
  { name: 'S', value: 'small' },
  { name: 'M', value: 'medium' },
  { name: 'L', value: 'large' },
];

export const TEXT_COLORS: TextColorOption[] = [
  { name: 'White', value: 'white', className: 'bg-white' },
  { name: 'Black', value: 'black', className: 'bg-black' },
  { name: 'Red', value: 'red', className: 'bg-red-500' },
  { name: 'Blue', value: 'blue', className: 'bg-blue-500' },
  { name: 'Yellow', value: 'yellow', className: 'bg-yellow-400' },
];

export const TEXT_ALIGNMENTS: TextAlignmentOption[] = [
  { name: 'Top Left', value: 'top left', icon: AlignTopLeftIcon },
  { name: 'Top Center', value: 'top center', icon: AlignTopCenterIcon },
  { name: 'Top Right', value: 'top right', icon: AlignTopRightIcon },
  { name: 'Middle Left', value: 'middle left', icon: AlignMiddleLeftIcon },
  { name: 'Center', value: 'center', icon: AlignCenterIcon },
  { name: 'Middle Right', value: 'middle right', icon: AlignMiddleRightIcon },
  { name: 'Bottom Left', value: 'bottom left', icon: AlignBottomLeftIcon },
  { name: 'Bottom Center', value: 'bottom center', icon: AlignBottomCenterIcon },
  { name: 'Bottom Right', value: 'bottom right', icon: AlignBottomRightIcon },
];