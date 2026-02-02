import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bizzy B's Tumblebus | Mobile Gymnastics Fun for Kids",
  description: "The Tumblebus is a full-sized school bus converted into a safe, fun child-sized gym! We bring fitness and fun directly to daycares, schools, birthday parties, and special events.",
  keywords: "tumblebus, mobile gymnastics, kids fitness, birthday party, daycare activities, children gym",
  openGraph: {
    title: "Bizzy B's Tumblebus | Mobile Gymnastics Fun",
    description: "We bring the gym to you! Mobile tumbling and gymnastics for kids.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚌</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
