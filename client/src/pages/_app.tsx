import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react"


const general = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "100 900",
  variable: "--font-general-sans",
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>ojà mi | a new shopping experience powered by Kora </title>
        <meta name="description" content="Powered by Kora Payments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
            <meta property="og:title" content="Oja Mi" />
            <meta
              property="og:description"
              content="A new shopping experience, powered by Kora Payments"
            />
            <meta property="og:site_name" content="oja mi" />
            <meta property="og:url" content="https://ojami.shop" />
            <meta property="og:image" content="/assets/thumbnail.png" />
        <link rel="icon" href="/icons/oja.svg" />
      </Head>
      <main className={`${general.className}`}>
        <Analytics />
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
