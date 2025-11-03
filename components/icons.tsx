import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

export const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.47 2.118L2.25 12.87a2.25 2.25 0 0 1 2.47-2.118a3 3 0 0 0 5.78-1.128m1.558 5.783a3 3 0 0 0 5.78 1.128 2.25 2.25 0 0 1 2.47 2.118l-2.242-4.148a2.25 2.25 0 0 1-2.47-2.118a3 3 0 0 0-5.78-1.128m-3.118 3.118a3 3 0 0 0 5.78 1.128m0-11.562a3 3 0 0 0-5.78-1.128 2.25 2.25 0 0 1-2.47-2.118L5.25 7.13a2.25 2.25 0 0 1 2.47 2.118a3 3 0 0 0 5.78 1.128Z" />
  </svg>
);

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const ScissorsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l-1.362 1.362a1.125 1.125 0 1 1-1.59-1.59l1.362-1.362L5.25 5.25 3.888 6.612a1.125 1.125 0 1 1-1.59-1.59l1.362-1.362L2.25 2.25l1.504 1.504L6.612 2.25a1.125 1.125 0 1 1 1.59 1.59L6.75 5.25l1.098 1.098Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 9.75l1.098 1.098 5.25-5.25a1.125 1.125 0 1 1 1.59 1.59l-5.25 5.25 1.098 1.098-1.098 1.098-5.25 5.25a1.125 1.125 0 1 1-1.59-1.59l5.25-5.25-1.098-1.098 1.098-1.098Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.848 11.25l5.25 5.25a1.125 1.125 0 1 1-1.59 1.59l-5.25-5.25m0 0-1.098 1.098-5.25 5.25a1.125 1.125 0 1 1-1.59-1.59l5.25-5.25 1.098-1.098 1.098 1.098Z" />
    </svg>
);

export const MinusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-11.667-11.668v4.992m0 0h-4.992m4.992 0-3.181-3.183a8.25 8.25 0 0 1 11.667 0l3.181 3.183" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const UndoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
  </svg>
);

export const RedoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
  </svg>
);

export const CompareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.375V5.625M12 18.375A8.25 8.25 0 0 0 18.375 12H5.625A8.25 8.25 0 0 0 12 18.375ZM12 5.625A8.25 8.25 0 0 1 18.375 12H5.625A8.25 8.25 0 0 1 12 5.625Z" />
  </svg>
);

export const TypeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-6.75 3h9m-9 3h9M3 3h18v18H3V3z" />
  </svg>
);

// --- Alignment Icons ---
const alignIconViewBox = "0 0 20 20";
// Fix: Changed "true" to a boolean `true` for the `aria-hidden` attribute to match the expected `Booleanish` type.
const alignIconProps = { fill: "currentColor", "aria-hidden": true as React.AriaAttributes["aria-hidden"] };

export const AlignTopLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M3 3h4v4H3V3Z" /></svg>
);
export const AlignTopCenterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M8 3h4v4H8V3Z" /></svg>
);
export const AlignTopRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M13 3h4v4h-4V3Z" /></svg>
);
export const AlignMiddleLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M3 8h4v4H3V8Z" /></svg>
);
export const AlignCenterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M8 8h4v4H8V8Z" /></svg>
);
export const AlignMiddleRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M13 8h4v4h-4V8Z" /></svg>
);
export const AlignBottomLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M3 13h4v4H3v-4Z" /></svg>
);
export const AlignBottomCenterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M8 13h4v4H8v-4Z" /></svg>
);
export const AlignBottomRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={alignIconViewBox} className={className} {...alignIconProps}><path d="M13 13h4v4h-4v-4Z" /></svg>
);