type IconProps = { className?: string };

const base = "h-6 w-6";

export function IconFormat({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <rect x="3" y="3" width="18" height="18" rx="1.5" />
 <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.45" />
 </svg>
 );
}

export function IconStandard({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
 <path d="M9 12l2 2 4-4" />
 </svg>
 );
}

export function IconFrost({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
 <path d="M12 5l2 2-2 2-2-2 2-2zM12 15l2 2-2 2-2-2 2-2z" opacity="0.6" />
 </svg>
 );
}

export function IconLoad({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 3v8M8 7l4 4 4-4" />
 <rect x="3" y="14" width="18" height="6" rx="1" />
 </svg>
 );
}

export function IconColor({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 005-5c0-3.9-4-6.7-9-6.7z" />
 <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
 <circle cx="12" cy="8.5" r="1" fill="currentColor" stroke="none" />
 <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />
 </svg>
 );
}

export function IconInstall({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14.7 6.3a3 3 0 00-4 4l-7.4 7.4 2 2 7.4-7.4a3 3 0 004-4l-2.3 2.3-1.7-1.7 2.3-2.3z" />
 </svg>
 );
}

export function IconPlay({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M8 5v14l11-7z" />
 </svg>
 );
}

export function IconTag({ className = base }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h7l11 11-7 7L3 10V3z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPhone({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
 <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.5a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
 </svg>
 );
}

export function IconCheck({ className = "h-4 w-4" }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
 <path d="M20 6L9 17l-5-5" />
 </svg>
 );
}

export function IconArrow({ className = "h-4 w-4" }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M5 12h14M13 6l6 6-6 6" />
 </svg>
 );
}

export function IconClose({ className = base }: IconProps) {
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M18 6L6 18M6 6l12 12" />
 </svg>
 );
}

export const featureIcons = [IconFormat, IconStandard, IconFrost, IconLoad, IconColor, IconInstall];
