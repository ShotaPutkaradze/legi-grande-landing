/** Red eyebrow + section title used at the top of every page section. */
export default function SectionHeading({
  eyebrow,
  title,
  className = "max-w-2xl",
  children,
}: {
  eyebrow: string;
  title: string;
  className?: string;
  /** Optional intro text rendered under the title. */
  children?: React.ReactNode;
}) {
  return (
    <div className={className || undefined}>
      <p className="eyebrow text-red">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
}
