import React, { useState, useCallback, ChangeEvent, useMemo } from 'react';
import { ImageData, MarketingMedium, GeneratedCreation, TextSize, TextColor, TextAlignment } from './types';
import { MARKETING_MEDIUMS, DEFAULT_IMAGES, STYLE_PRESETS, TEXT_SIZES, TEXT_COLORS, TEXT_ALIGNMENTS } from './constants';
import * as geminiService from './services/geminiService';
import { Spinner, UploadIcon, WandIcon, DownloadIcon, ScissorsIcon, MinusCircleIcon, RefreshIcon, SparklesIcon, UndoIcon, RedoIcon, CompareIcon, TypeIcon } from './components/icons';

// --- Helper Functions ---
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const urlToImageData = async (url: string): Promise<ImageData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${url}. Status: ${response.statusText}`);
  }
  const blob = await response.blob();
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
  return { base64, mimeType: blob.type };
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


// --- UI Components ---

const Header: React.FC<{ onReset: () => void }> = ({ onReset }) => (
    <header className="text-center mb-8 relative">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Product Visualizer AI
        </h1>
        <p className="mt-2 text-lg text-gray-400">
            Generate stunning marketing visuals for your products in seconds.
        </p>
        <button
            onClick={onReset}
            className="absolute top-0 right-0 bg-gray-700/50 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all"
            title="Reset Application"
            aria-label="Reset Application"
        >
            <RefreshIcon className="w-6 h-6" />
        </button>
    </header>
);

const ImageUploader: React.FC<{
  onImageUpload: (imageData: ImageData) => void;
  originalImage: ImageData | null;
  isLoading: boolean;
}> = ({ onImageUpload, originalImage, isLoading }) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        onImageUpload({ base64, mimeType: file.type });
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors duration-300">
        <input
          type="file" id="file-upload" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" disabled={isLoading}
        />
        {originalImage ? (
          <div className="flex flex-col items-center">
            <img src={`data:${originalImage.mimeType};base64,${originalImage.base64}`} alt="Product preview" className="max-h-32 rounded-md mb-4" />
            <label htmlFor="file-upload" className="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer">Change Image</label>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <UploadIcon className="w-12 h-12 mb-2" />
            <p>
              <label htmlFor="file-upload" className="font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer">Click to upload</label> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DefaultImageSelector: React.FC<{
  onSelect: (url: string) => void;
  isDisabled: boolean;
}> = ({ onSelect, isDisabled }) => (
  <div className="w-full mt-6">
    <h3 className="text-md font-semibold text-gray-400 mb-3 text-center">Or choose a sample</h3>
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
      {DEFAULT_IMAGES.map((image) => (
        <button
          key={image.name} onClick={() => onSelect(image.url)} disabled={isDisabled}
          className="group border-2 border-gray-700 rounded-lg p-2 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800/50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label={`Select ${image.name}`}
        >
          <img 
            src={image.url} alt={image.name} crossOrigin="anonymous"
            className="w-full h-16 object-contain rounded-md group-hover:scale-105 transition-transform duration-200"
           />
          <p className="text-xs text-gray-300 mt-2 truncate font-medium">{image.name}</p>
        </button>
      ))}
    </div>
  </div>
);

const GenerationControls: React.FC<{
    onGenerate: (mediums: string[]) => void;
    isDisabled: boolean;
}> = ({ onGenerate, isDisabled }) => {
    const [selectedMediums, setSelectedMediums] = useState<Set<MarketingMedium>>(new Set());
    const [customMedium, setCustomMedium] = useState('');

    const handleMediumToggle = (medium: MarketingMedium) => {
        setSelectedMediums(prev => {
            const newSet = new Set(prev);
            if (newSet.has(medium)) {
                newSet.delete(medium);
            } else {
                newSet.add(medium);
            }
            return newSet;
        });
    };

    const handleGenerateSelected = () => {
        if (selectedMediums.size > 0) {
            onGenerate(Array.from(selectedMediums));
        }
    };

    const handleGenerateCustom = (e: React.FormEvent) => {
        e.preventDefault();
        if (customMedium.trim()) {
            onGenerate([customMedium.trim()]);
            setCustomMedium('');
        }
    };
    
    const handleSurpriseMe = () => {
        const randomIndex = Math.floor(Math.random() * MARKETING_MEDIUMS.length);
        onGenerate([MARKETING_MEDIUMS[randomIndex]]);
    };

    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold text-gray-200 mb-4">2. Generate Visuals</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-md font-semibold text-gray-400 mb-3">Select Mediums</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {MARKETING_MEDIUMS.map((medium) => (
                            <label key={medium} className={`flex items-center gap-2 p-3 rounded-md transition-colors duration-200 cursor-pointer ${selectedMediums.has(medium) ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                <input type="checkbox" checked={selectedMediums.has(medium)} onChange={() => handleMediumToggle(medium)} className="form-checkbox bg-gray-800 border-gray-500 text-indigo-500 rounded focus:ring-indigo-500" />
                                <span className="font-medium text-white">{medium}</span>
                            </label>
                        ))}
                    </div>
                    <button onClick={handleGenerateSelected} disabled={isDisabled || selectedMediums.size === 0} className="w-full mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-300">
                        Generate for {selectedMediums.size} Selected
                    </button>
                </div>

                <div>
                    <h3 className="text-md font-semibold text-gray-400 mb-3">Or Try Something New</h3>
                    <form onSubmit={handleGenerateCustom} className="flex gap-2">
                        <input
                            type="text" value={customMedium} onChange={(e) => setCustomMedium(e.target.value)}
                            placeholder="e.g., 'a laptop sticker'" disabled={isDisabled}
                            className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                        <button type="submit" disabled={isDisabled || !customMedium.trim()} className="px-4 py-2 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-300">
                            Generate
                        </button>
                    </form>
                </div>
                 <button onClick={handleSurpriseMe} disabled={isDisabled} className="w-full mt-3 px-4 py-2 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-300">
                    <SparklesIcon className="w-5 h-5"/>
                    Surprise Me!
                </button>
            </div>
        </div>
    );
};


const RefinementControls: React.FC<{
  onRefine: (prompt: string, negativePrompt: string) => void;
  isDisabled: boolean;
}> = ({ onRefine, isDisabled }) => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  // Text overlay state
  const [overlayText, setOverlayText] = useState('');
  const [textSize, setTextSize] = useState<TextSize>('medium');
  const [textColor, setTextColor] = useState<TextColor>('white');
  const [textAlignment, setTextAlignment] = useState<TextAlignment>('center');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onRefine(prompt, negativePrompt);
      setPrompt('');
    }
  };
  
  const handlePresetClick = (presetPrompt: string) => {
      onRefine(presetPrompt, negativePrompt);
  };

  const handleApplyText = () => {
    if (!overlayText.trim()) return;
    const textPrompt = `Overlay the text "${overlayText.trim()}" on the image. Use a ${textSize} font size, ${textColor} color, and place it at the ${textAlignment} position. Do not change the rest of the image.`;
    onRefine(textPrompt, negativePrompt);
  };

  return (
    <div className="w-full space-y-8">
      <h2 className="text-lg font-semibold text-gray-200 -mb-4">3. Refine Selected Image</h2>
      
      {/* Quick Styles Section */}
      <details className="space-y-4" open>
        <summary className="text-md font-semibold text-gray-400 cursor-pointer">Quick Styles</summary>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STYLE_PRESETS.map((preset) => (
                <button
                    key={preset.name} onClick={() => handlePresetClick(preset.prompt)} disabled={isDisabled}
                    className="px-3 py-2 text-sm bg-gray-700 text-white rounded-md font-semibold hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                >
                    <WandIcon className="w-4 h-4" />
                    {preset.name}
                </button>
            ))}
        </div>
      </details>
      
      {/* Text Overlay Section */}
       <details className="space-y-4" open>
        <summary className="text-md font-semibold text-gray-400 cursor-pointer">Add Text Overlay</summary>
         <div className="space-y-4">
           <input
             type="text" value={overlayText} onChange={(e) => setOverlayText(e.target.value)}
             placeholder="Your text here..." disabled={isDisabled}
             className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
           />
           {/* Size Controls */}
           <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-gray-300">Size:</span>
             <div className="flex items-center gap-2 rounded-md bg-gray-700 p-1">
               {TEXT_SIZES.map(size => (
                 <button key={size.value} onClick={() => setTextSize(size.value)} disabled={isDisabled}
                   className={`px-3 py-1 text-xs font-bold rounded transition-colors ${textSize === size.value ? 'bg-indigo-500 text-white' : 'hover:bg-gray-600'}`}
                 >{size.name}</button>
               ))}
             </div>
           </div>
           {/* Color Controls */}
            <div className="flex items-center gap-4">
               <span className="text-sm font-medium text-gray-300">Color:</span>
               <div className="flex items-center gap-2">
                   {TEXT_COLORS.map(color => (
                       <button key={color.value} onClick={() => setTextColor(color.value)} disabled={isDisabled}
                          className={`w-6 h-6 rounded-full ${color.className} border-2 ${textColor === color.value ? 'border-indigo-400 ring-2 ring-indigo-400' : 'border-gray-500 hover:border-gray-400'}`}
                          title={color.name} aria-label={`Select ${color.name} color`}
                       />
                   ))}
               </div>
           </div>
           {/* Alignment Controls */}
           <div className="flex items-center gap-4">
               <span className="text-sm font-medium text-gray-300">Align:</span>
               <div className="grid grid-cols-3 gap-1 p-1 bg-gray-700 rounded-md">
                   {TEXT_ALIGNMENTS.map(align => {
                       const Icon = align.icon;
                       return (
                           <button key={align.value} onClick={() => setTextAlignment(align.value)} disabled={isDisabled}
                               className={`p-1.5 rounded transition-colors ${textAlignment === align.value ? 'bg-indigo-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                               title={align.name} aria-label={`Align text ${align.name}`}
                           >
                               <Icon className="w-5 h-5" />
                           </button>
                       );
                   })}
               </div>
           </div>
           <button onClick={handleApplyText} disabled={isDisabled || !overlayText.trim()} className="w-full px-4 py-2 bg-teal-600 text-white rounded-md font-semibold hover:bg-teal-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-300">
             <TypeIcon className="w-5 h-5"/> Apply Text
           </button>
         </div>
      </details>
      
      {/* Custom Prompt Section */}
       <details className="space-y-4">
        <summary className="text-md font-semibold text-gray-400 cursor-pointer">Custom Prompt</summary>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-2">
                <input
                  type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Make it float in space'" disabled={isDisabled}
                  className="flex-grow bg-gray-800 border border-gray-600 text-gray-200 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <button
                  type="submit" disabled={isDisabled || !prompt.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-300"
                >
                  <WandIcon className="w-5 h-5" /> Refine
                </button>
            </div>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MinusCircleIcon className="w-5 h-5 text-gray-400" />
               </div>
               <input
                  type="text" value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Things to avoid (e.g., 'text, ugly')" disabled={isDisabled}
                  className="w-full bg-gray-800 border border-gray-600 text-gray-200 rounded-md py-2 pl-10 pr-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
               />
            </div>
        </form>
      </details>
    </div>
  );
};

const MainViewer: React.FC<{
  creation: GeneratedCreation | null;
  originalImage: ImageData | null;
  isLoading: boolean;
  loadingMessage: string | null;
  viewMode: 'single' | 'side-by-side';
  onToggleView: () => void;
  onUndo: () => void;
  onRedo: () => void;
}> = ({ creation, originalImage, isLoading, loadingMessage, viewMode, onToggleView, onUndo, onRedo }) => {
    const currentImage = creation ? creation.history[creation.historyIndex] : null;
    const canUndo = creation ? creation.historyIndex > 0 : false;
    const canRedo = creation ? creation.historyIndex < creation.history.length - 1 : false;

    const handleDownload = () => {
        if (!currentImage || !creation) return;
        const link = document.createElement('a');
        link.href = `data:${currentImage.mimeType};base64,${currentImage.base64}`;
        const extension = currentImage.mimeType.split('/')[1] || 'png';
        link.download = `generated-${creation.medium.replace(/\s+/g, '-').toLowerCase()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full h-[30rem] bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-center p-4 relative overflow-hidden">
        {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10 text-center p-4">
            <Spinner className="w-12 h-12 text-indigo-400" />
            <p className="text-gray-300 mt-4 font-medium">{loadingMessage || 'Generating image...'}</p>
            </div>
        )}
        {creation && currentImage ? (
            <>
              {viewMode === 'side-by-side' && originalImage ? (
                <div className="flex w-full h-full items-center justify-center gap-2">
                  <div className="flex-1 h-full flex flex-col items-center justify-center relative">
                    <img src={`data:${originalImage.mimeType};base64,${originalImage.base64}`} alt="Original" className="max-w-full max-h-full object-contain rounded-md" />
                    <span className="absolute bottom-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">Original</span>
                  </div>
                  <div className="w-px h-4/5 bg-gray-600"></div>
                  <div className="flex-1 h-full flex flex-col items-center justify-center relative">
                    <img src={`data:${currentImage.mimeType};base64,${currentImage.base64}`} alt={`Generated: ${creation.medium}`} className="max-w-full max-h-full object-contain rounded-md" />
                    <span className="absolute bottom-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">Generated</span>
                  </div>
                </div>
              ) : (
                <img
                    src={`data:${currentImage.mimeType};base64,${currentImage.base64}`}
                    alt={`Generated visualization: ${creation.medium}`}
                    className="max-w-full max-h-full object-contain rounded-md"
                />
              )}
                
                {!isLoading && (
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className="bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full self-end">{creation.medium}</span>
                      <div className="flex flex-col gap-2 items-end">
                        <div className="flex gap-2 bg-gray-900/70 p-1 rounded-full">
                           <button onClick={onUndo} disabled={!canUndo} className="p-2 rounded-full text-white hover:text-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200" title="Undo" aria-label="Undo"><UndoIcon className="w-5 h-5" /></button>
                           <button onClick={onRedo} disabled={!canRedo} className="p-2 rounded-full text-white hover:text-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-200" title="Redo" aria-label="Redo"><RedoIcon className="w-5 h-5" /></button>
                        </div>
                        <div className="flex gap-2 bg-gray-900/70 p-1 rounded-full">
                            <button onClick={onToggleView} disabled={!originalImage} className="p-2 rounded-full text-white hover:text-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300" title="Compare View" aria-label="Toggle Compare View">
                              <CompareIcon className="w-6 h-6" />
                            </button>
                            <button onClick={handleDownload} className="p-2 rounded-full text-white hover:text-indigo-300 transition-all duration-300" title="Download image" aria-label="Download image">
                              <DownloadIcon className="w-6 h-6" />
                            </button>
                        </div>
                      </div>
                    </div>
                )}
            </>
        ) : (
            <div className="text-center text-gray-500">
              <p className="text-xl font-medium">Your generated visuals will appear here</p>
              <p className="mt-1">Start by uploading a product and generating a visual.</p>
            </div>
        )}
        </div>
    );
};

const CreationsGallery: React.FC<{
    creations: GeneratedCreation[];
    activeId: string | null;
    onSelect: (id: string) => void;
}> = ({ creations, activeId, onSelect }) => {
    if (creations.length === 0) return null;
    
    return (
        <div className="w-full mt-8">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Creations Gallery</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {creations.map(creation => {
                    const currentImage = creation.history[creation.historyIndex];
                    return (
                        <button
                            key={creation.id}
                            onClick={() => onSelect(creation.id)}
                            className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeId === creation.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-700 hover:border-indigo-600'}`}
                        >
                            <img
                                src={`data:${currentImage.mimeType};base64,${currentImage.base64}`}
                                alt={creation.medium}
                                className="w-full h-28 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1">
                                <p className="text-xs text-white text-center truncate">{creation.medium}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [generatedCreations, setGeneratedCreations] = useState<GeneratedCreation[]>([]);
  const [activeCreationId, setActiveCreationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'side-by-side'>('single');
  
  const activeCreation = useMemo(() => {
    if (!activeCreationId) return null;
    return generatedCreations.find(c => c.id === activeCreationId) || null;
  }, [activeCreationId, generatedCreations]);

  const resetState = () => {
    setOriginalImage(null);
    setGeneratedCreations([]);
    setActiveCreationId(null);
    setIsLoading(false);
    setLoadingMessage(null);
    setError(null);
    setViewMode('single');
  };
  
  const handleImageUpload = (imageData: ImageData) => {
    setOriginalImage(imageData);
    setGeneratedCreations([]);
    setActiveCreationId(null);
  };

  const handleDefaultImageSelect = async (url: string) => {
    setIsLoading(true);
    setLoadingMessage('Loading sample image...');
    try {
        const imageData = await urlToImageData(url);
        setOriginalImage(imageData);
        setGeneratedCreations([]);
        setActiveCreationId(null);
    } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load image.");
    } finally {
        setIsLoading(false);
        setLoadingMessage(null);
    }
  };

  const handleGenerate = useCallback(async (mediums: string[]) => {
    if (!originalImage) return;
    
    setIsLoading(true);
    setError(null);
    
    const newCreations: GeneratedCreation[] = [];

    await Promise.all(mediums.map(async (medium, index) => {
        try {
            setLoadingMessage(`(${index + 1}/${mediums.length}) Visualizing on a ${medium}...`);
            const imageData = await geminiService.generateMarketingImage(originalImage, medium as MarketingMedium);
            newCreations.push({ id: generateId(), medium, history: [imageData], historyIndex: 0 });
        } catch (err) {
            console.error(`Failed to generate for ${medium}:`, err);
        }
    }));
    
    if (newCreations.length > 0) {
      setGeneratedCreations(prev => [...prev, ...newCreations]);
      if (!activeCreationId) {
          setActiveCreationId(newCreations[0].id);
      }
    } else {
        setError("Failed to generate any new visuals. Please try again.");
    }
    
    setIsLoading(false);
    setLoadingMessage(null);
  }, [originalImage, activeCreationId]);

  const handleEdit = useCallback(async (prompt: string, negativePrompt: string) => {
    if (!activeCreation) return;
    
    const currentImage = activeCreation.history[activeCreation.historyIndex];
    if (!currentImage) return;

    setIsLoading(true);
    setError(null);
    setLoadingMessage(`Refining image for ${activeCreation.medium}...`);

    try {
        const newImage = await geminiService.editImage(currentImage, prompt, negativePrompt);
        setGeneratedCreations(prev => prev.map(c => {
            if (c.id === activeCreationId) {
                const newHistory = c.history.slice(0, c.historyIndex + 1);
                newHistory.push(newImage);
                return { ...c, history: newHistory, historyIndex: newHistory.length - 1 };
            }
            return c;
        }));
    } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to edit image.");
    } finally {
        setIsLoading(false);
        setLoadingMessage(null);
    }
  }, [activeCreation, activeCreationId]);

  const handleRemoveBackground = useCallback(async () => {
    if (!originalImage) return;
    
    setIsLoading(true);
    setError(null);
    setLoadingMessage('Removing background...');

    try {
        const newImage = await geminiService.removeImageBackground(originalImage);
        setOriginalImage(newImage);
        setGeneratedCreations([]);
        setActiveCreationId(null);
    } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove background.");
    } finally {
        setIsLoading(false);
        setLoadingMessage(null);
    }
  }, [originalImage]);

  const handleUndo = useCallback(() => {
    if (!activeCreation || activeCreation.historyIndex === 0) return;
    setGeneratedCreations(prev => prev.map(c => 
        c.id === activeCreationId ? { ...c, historyIndex: c.historyIndex - 1 } : c
    ));
  }, [activeCreation, activeCreationId]);

  const handleRedo = useCallback(() => {
    if (!activeCreation || activeCreation.historyIndex >= activeCreation.history.length - 1) return;
    setGeneratedCreations(prev => prev.map(c => 
        c.id === activeCreationId ? { ...c, historyIndex: c.historyIndex + 1 } : c
    ));
  }, [activeCreation, activeCreationId]);

  const handleToggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'single' ? 'side-by-side' : 'single');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onReset={resetState} />

        {error && (
            <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-md relative mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col gap-8 p-6 bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg self-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4">1. Choose Product Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage} isLoading={isLoading} />
               {originalImage && (
                  <button onClick={handleRemoveBackground} disabled={isLoading} className="w-full mt-4 px-4 py-2 bg-gray-700 text-white rounded-md font-semibold hover:bg-teal-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-300">
                    <ScissorsIcon className="w-5 h-5" /> Remove Background
                  </button>
                )}
              <DefaultImageSelector onSelect={handleDefaultImageSelect} isDisabled={isLoading} />
            </div>
            
            {originalImage && (
              <GenerationControls onGenerate={handleGenerate} isDisabled={isLoading} />
            )}

            {activeCreation && (
              <RefinementControls onRefine={handleEdit} isDisabled={isLoading} />
            )}
          </div>

          <div className="lg:sticky top-8 self-start h-full">
            <MainViewer 
                creation={activeCreation} 
                originalImage={originalImage}
                isLoading={isLoading} 
                loadingMessage={loadingMessage}
                viewMode={viewMode}
                onToggleView={handleToggleViewMode}
                onUndo={handleUndo}
                onRedo={handleRedo}
            />
            <CreationsGallery creations={generatedCreations} activeId={activeCreationId} onSelect={setActiveCreationId} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;