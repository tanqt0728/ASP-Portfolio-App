import "@/styles/globals.css";
import { AuthProvider } from "../contexts/AuthContext"; // Adjust the import path as needed
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <NavBar />
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </AuthProvider>
  );
}
