import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nunito } from 'next/font/google'
import SessionWrapper from "@/components/SessionWrapper";

const nunito = Nunito({ subsets: ['latin'], weight: '700' })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Buy Me a Coffee",
  description: "Fund your creative work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={nunito.className}
      >
        <SessionWrapper>
          <Navbar />
          <div className="min-h-[80vh]">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
