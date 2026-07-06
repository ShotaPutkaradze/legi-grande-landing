import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Noto_Sans_Georgian, Oswald } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import PhoneTracker from "@/components/PhoneTracker";

// Meta (Facebook) Pixel ID. Change here to point at a different pixel.
const META_PIXEL_ID = "2195529237958457";

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-body",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Industrial display face for Latin headlines (e.g. the GRANDE wordmark).
const oswald = Oswald({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://legi-grande-landing.workers.dev",
  ),
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
    <html lang="ka" className={`${notoGeorgian.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <PhoneTracker />
        <LanguageProvider>{children}</LanguageProvider>
        html<link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"><script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script><df-messenger  project-id="ваш-проект"  agent-id="длинный-id-вашего-агента"  language-code="ru">  <df-messenger-chat chat-title="Менеджер Legi"></df-messenger-chat></df-messenger>
      </body>
    </html>
  );
}
