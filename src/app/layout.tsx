import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import StoreProvider from "./StoreProvider";
const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"] });
const segoe = localFont({
  src: [
    {
      path: "../../public/fonts/segoeuithibd.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/segoeuithis.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/segoeuithisi.ttf",
      style: "italic",
      weight: "700",
    },
    {
      path: "../../public/fonts/segoeuithisz.ttf",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-segoe",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Home | CasinoCity24",
  description:
    "Top online casino and betting site in Bangladesh! Enjoy live sports betting, casino games, slots, and our exclusive Aviator crash game. Play now and win real money with secure payments and fast withdrawals.",
  icons: "/assets/favicon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${oswald.variable}  ${segoe.variable} antialiased font-segoe bg-primary ${notoBengali.className}`}
      >
        <SessionProvider session={session}>
          <StoreProvider>
       
            {children}
          </StoreProvider>
        </SessionProvider>

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
