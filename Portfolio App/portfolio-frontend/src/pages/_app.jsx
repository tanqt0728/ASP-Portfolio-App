import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "grapesjs/dist/css/grapes.min.css";
import "@/styles/globals.scss";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import Nav from "../components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Nav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
