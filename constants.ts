import {
  PresetMarketingMedium,
  DefaultImage,
  StylePreset,
  TextSize,
  TextColorOption,
  TextAlignmentOption,
  TextOption,
} from './types';
import {
  AlignTopLeftIcon, AlignTopCenterIcon, AlignTopRightIcon,
  AlignMiddleLeftIcon, AlignCenterIcon, AlignMiddleRightIcon,
  AlignBottomLeftIcon, AlignBottomCenterIcon, AlignBottomRightIcon
} from './components/icons';

export const MARKETING_MEDIUMS = [
  'Coffee Mug',
  'Billboard',
  'T-Shirt',
  'Shopping Bag',
  'Cap',
  'Poster',
] as const satisfies readonly PresetMarketingMedium[];

export const DEFAULT_IMAGES: DefaultImage[] = [
  { 
    name: 'Soda Can', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Coca-Cola_can_2014.png/375px-Coca-Cola_can_2014.png' 
  },
  { 
    name: 'Lotion Bottle', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nivea_Soft_200ml.jpg/450px-Nivea_Soft_200ml.jpg' 
  },
  { 
    name: 'Classic Sneaker', 
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Reebok_Classic_leather_shoes.jpg/640px-Reebok_Classic_leather_shoes.jpg' 
  },
  {
    name: 'Wrist Watch',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Reloj_de_pulsera_de_un_solo_bot%C3%B3n_longines_de_1925.jpg/480px-Reloj_de_pulsera_de_un_solo_bot%C3%B3n_longines_de_1925.jpg'
  },
  {
    name: 'Headphones',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bose_QuietComfort_35_II_black_diagonal.jpg/640px-Bose_QuietComfort_35_II_black_diagonal.jpg'
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