import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
import Header from "components/header";
import Footer from "components/footer";

const poppins = Poppins({
      weight: ['400', '700'],
      subsets: ['latin'],
      display: 'swap',
  });

export const metadata: Metadata = {
  title: "Dana's Portfolio",
  description: "Welcome to my portfolio website. Here you can find information about my projects, skills, and how to contact me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
