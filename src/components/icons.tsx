type IconProps = { className?: string };

const base = "h-6 w-6";

/** Shared 24×24 outline-icon frame; each icon only supplies its shapes. */
function SvgIcon({
  className,
  strokeWidth = "1.6",
  children,
}: {
  className: string;
  strokeWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconFormat({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.45" />
    </SvgIcon>
  );
}

export function IconStandard({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </SvgIcon>
  );
}

export function IconFrost({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
      <path d="M12 5l2 2-2 2-2-2 2-2zM12 15l2 2-2 2-2-2 2-2z" opacity="0.6" />
    </SvgIcon>
  );
}

export function IconLoad({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 3v8M8 7l4 4 4-4" />
      <rect x="3" y="14" width="18" height="6" rx="1" />
    </SvgIcon>
  );
}

export function IconColor({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.8 1.8-1.8H16a5 5 0 005-5c0-3.9-4-6.7-9-6.7z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}

export function IconLeaf({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M5 21c0-9 6-15 16-16C20 14 14 20 5 21z" />
      <path d="M5 21c3-6 7-9 12-10" opacity="0.7" />
    </SvgIcon>
  );
}

export function IconTag({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M3 3h7l11 11-7 7L3 10V3z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}

export function IconPhone({ className = base }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.5a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
    </SvgIcon>
  );
}

export function IconCheck({ className = "h-4 w-4" }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth="2.4">
      <path d="M20 6L9 17l-5-5" />
    </SvgIcon>
  );
}

export function IconArrow({ className = "h-4 w-4" }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </SvgIcon>
  );
}

export function IconClose({ className = base }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </SvgIcon>
  );
}

export const featureIcons = {
  format: IconFormat,
  standard: IconStandard,
  frost: IconFrost,
  load: IconLoad,
  color: IconColor,
  leaf: IconLeaf,
};
