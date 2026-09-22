import type { Metadata } from "next";
import { Baloo_2, Caveat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Mila Scholz",
  description: "Portfolio of Mila Scholz — created to create.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </body>
    </html>
  );
}
