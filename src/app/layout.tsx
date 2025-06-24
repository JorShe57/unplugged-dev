import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Unplugged Brewing Co. | Elyria, OH • Relax. Drink Beer.",
  description: "Unplugged Brewing Co. in Elyria, OH is a garage-style microbrewery offering craft lagers, IPAs, stouts and live music—relax, drink beer, and unplug.",
  keywords: [
    "craft brewery",
    "microbrewery", 
    "Elyria Ohio",
    "craft beer",
    "Munich lager",
    "IPA",
    "stout",
    "live music",
    "garage brewery",
    "local beer",
    "Unplugged Brewing",
    "Cleveland brewery passport"
  ],
  authors: [{ name: "Unplugged Brewing Company" }],
  creator: "Unplugged Brewing Company",
  publisher: "Unplugged Brewing Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://unplugbrew.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unplugbrew.com",
    title: "Unplugged Brewing Co. | Craft Beer in Elyria, OH",
    description: "Garage-style microbrewery offering craft lagers, IPAs, stouts and live music. Come relax, drink beer, and unplug with us!",
    siteName: "Unplugged Brewing Company",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Unplugged Brewing Company - Craft Beer in Elyria, OH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unplugged Brewing Co. | Craft Beer in Elyria, OH",
    description: "Garage-style microbrewery offering craft lagers, IPAs, stouts and live music. Relax, drink beer, and unplug!",
    images: ["/og-image.jpg"], // Same image as OG
    creator: "@unpluggedbrew", // Add if you have a Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

// Structured Data for Brewery
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Brewery",
  name: "Unplugged Brewing Company",
  alternateName: "Unplugged Brewing Co.",
  description: "Garage-style microbrewery in Elyria, OH offering craft lagers, IPAs, stouts, live music, and community events. Relax. Drink Beer.",
  url: "https://unplugbrew.com",
  logo: "favicon.webp", // Add your logo URL
  image: "https://unplugbrew.com/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "201 E Bridge St",
    addressLocality: "Elyria",
    addressRegion: "OH",
    postalCode: "44035",
    addressCountry: "US"
  },
  telephone: "(440) 345-6972",
  email: "sales@unplugbrew.com",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "16:00",
      closes: "22:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "23:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday", 
      opens: "12:00",
      closes: "20:00"
    }
  ],
  amenityFeature: [
    "Outdoor seating",
    "ADA compliant", 
    "Wi-Fi",
    "Bike parking",
    "Live music",
    "Family friendly"
  ],
  servesCuisine: "Beer",
  hasMenu: "https://unplugbrew.com/menu", // Will be your beer menu page
  event: "Live music, cigars & BBQ nights",
  slogan: "Relax. Drink Beer.",
  geo: {
    "@type": "GeoCoordinates",
    latitude: "41.3683",
    longitude: "-82.1076"
  },
  sameAs: [
    // Add your social media URLs here
    // "https://www.facebook.com/unpluggedbrew",
    // "https://www.instagram.com/unpluggedbrew", 
    // "https://twitter.com/unpluggedbrew"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}