import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculator shippingking",
  description: "Test Frontend Developer DOT INDONESIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ReactQueryProvider>
            <div>
              {children}
            </div>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
