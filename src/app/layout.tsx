import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-body",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grande — მსხვილფორმატიანი ბეტონის ფილა | LEGI",
  description:
    "Grande — დიდი ფორმატის ტროტუარის ფილა LEGI-სგან. ევროპული დიზაინი, ყინვაგამძლე, 8 სმ სისქე. მიიღე ფასი და კონსულტაცია.",
  keywords: [
    "ბეტონის ფილა",
    "ტროტუარის ფილა",
    "Grande",
    "LEGI",
    "concrete pavers",
    "paving slab Georgia",
  ],
  openGraph: {
    title: "Grande — მსხვილფორმატიანი ბეტონის ფილა | LEGI",
    description:
      "დიდი ფორმატის ტროტუარის ფილა ევროპული სტანდარტით. ნახე ვიდეო, ფასები და მიიღე უფასო კონსულტაცია.",
    type: "website",
    locale: "ka_GE",
    siteName: "LEGI",
    images: [
      {
        url: "/og-grande.jpg",
        width: 1200,
        height: 630,
        alt: "Grande — მსხვილფორმატიანი ბეტონის ფილა LEGI-სგან",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" className={`${notoGeorgian.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
