"use client";

import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
