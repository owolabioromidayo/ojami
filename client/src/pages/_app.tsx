import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import localFont from "next/font/local";

const general = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  weight: "100 900",
  variable: "--font-general-sans",
});

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Sell anything" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/oja.svg" />
      </Head>
      <main className={`${general.className}`}>
        {getLayout(
        <Component {...pageProps} />)}
      </main>
    </ChakraProvider>
  );
}
