import { ReactElement, useEffect, useState } from "react";
import { ReactNode } from "react";

import { NextPage } from "next";
import type { AppProps } from "next/app";

import Providers from "./providers";
import "@/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    isClient && <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
  );
}
