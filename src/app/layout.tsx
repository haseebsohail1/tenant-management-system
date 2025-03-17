"use client";

import { Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import ReduxProvider from "@/redux/ReduxProvider";

const alexandria = Alexandria({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname: any = usePathname();

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TMS</title>
      </head>
      <body className={`${alexandria.className} bg-white text-black flex`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <SessionProvider>
          <main
            className={`content flex-1 overflow-y-auto w-full bg-gray-900 h-screen overflow-auto`}
          >
            { <ReduxProvider>{children}</ReduxProvider> }
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
