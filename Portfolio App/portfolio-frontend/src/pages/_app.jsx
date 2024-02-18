import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import "@/styles/globals.scss";
import { AuthProvider } from "../contexts/AuthContext"; // Adjust the import path as needed
import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import "grapesjs/dist/css/grapes.min.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextUIProvider>
          <Component {...pageProps} />
      </NextUIProvider>
    </AuthProvider>
  );
}
