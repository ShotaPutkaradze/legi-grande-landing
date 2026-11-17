import Image from "next/image";

export default function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <a href="#top" className="flex items-center select-none" aria-label="Legi — ვქმნით ხარისხს">
      <Image
        src="/legi-logo.webp"
        alt="Legi"
        width={154}
        height={40}
        priority
        className={`${className} w-auto`}
      />
    </a>
  );
}
