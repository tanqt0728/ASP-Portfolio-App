import React, { useEffect } from "react";
import Footer from "../Footer";

export default function Layout({ headerVariant, children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
