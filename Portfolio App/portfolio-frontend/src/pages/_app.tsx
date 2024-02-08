import "@/styles/globals.css";
import { AuthProvider } from '../contexts/AuthContext'; // Adjust the import path as needed
import type { AppProps } from "next/app";
import NavBar from '../components/NavBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
   <NavBar />
  <Component {...pageProps} />
</AuthProvider>);
}

