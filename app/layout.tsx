import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Appium Dashboard",
  description: "Try to create simple appium dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-screen w-full"
      >
        {children}
      </body>
    </html>
  );
}
