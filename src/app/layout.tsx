import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"],variable: "--font-sans", });

export const metadata: Metadata = {
  title: "meter reading",
  description: "meter reading test assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
