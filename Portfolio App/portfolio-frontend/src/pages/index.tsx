import { Inter } from "next/font/google";
import useAuth from "../hooks/useAuth";
import * as React from "react";
import { Button } from "@nextui-org/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useAuth(); // Hook to check if the user is authenticated

  return (
    <main>          
      <Button>Press me</Button>
    </main>
  );
}
