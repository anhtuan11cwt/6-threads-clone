import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description: "Bản sao mạng xã hội Threads",
  title: "Threads Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} bg-background text-primary antialiased`}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e1e1e",
              border: "1px solid #333",
              color: "#fff",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
