import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Foodiez - Fresh Food Delivery & Table Booking",
  description: "Experience exceptional dining with our curated menu, fast food delivery, and seamless table reservation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <ToastContainer />
        <Toaster />
      </body>
    </html>
  );
}
