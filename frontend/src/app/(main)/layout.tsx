import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Appbar } from "@/components/home/app-bar";
import TanStackProvider from "@/provider/tanstack";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          forcedTheme="light"
          disableTransitionOnChange
        >
          <TanStackProvider>

    
          <Appbar />
          {children}
          <Toaster />
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
