import { PHONE, PHONE_HREF } from "@/lib/content";

/** `tel:` link to the sales number; shows the formatted number unless children are given. */
export default function PhoneLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={`tel:${PHONE_HREF}`} className={className}>
      {children ?? PHONE}
    </a>
  );
}
