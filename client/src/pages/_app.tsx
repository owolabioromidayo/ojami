import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import localFont from "next/font/local";

const general = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "100 900",
  variable: "--font-general-sans",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Sell anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/oja.svg" />
      </Head>
      <main className={`${general.className}`}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
