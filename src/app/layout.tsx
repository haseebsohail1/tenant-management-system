'use client';

import { Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from "react";
import { usePathname } from 'next/navigation';

const alexandria = Alexandria({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname: any = usePathname(); // Get current route

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Auth Integrate</title>
      </head>
      <body className={`${alexandria.className} bg-white text-black flex`}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <SessionProvider>
          {/* {showLayout ? (
            <div className="flex w-full">
              <div className="main-content flex">
                <></>
              </div> */}
              <main className={`content flex-1 overflow-y-auto w-full bg-black h-screen overflow-auto`}>
                {children}
              </main>
            {/* </div>
          ) : <main className={`content flex-1 overflow-y-auto w-full bg-black`}>
            <></>
            {children}
          </main>} */}
        </SessionProvider>
      </body>
    </html>
  );
}
