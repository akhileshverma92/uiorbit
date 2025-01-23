import type { Metadata } from "next";
import { Geist, Geist_Mono} from"next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import { ThemeProvider } from "./providers"
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "UIorbit",
  description: "UIorbit is a collection of UI components and libraries for web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center  justify-normal`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <Analytics />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
