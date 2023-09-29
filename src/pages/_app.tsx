import '@/styles/globals.css';
import '@/styles/nprogress.css';
import 'driver.js/dist/driver.css';
import '@/styles/driver-theme.css';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { Progress } from '@/components/nprogress';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import { GTagManager } from '@/components/gtag-manager';
import { DefaultSeo } from 'next-seo';
import config from 'next-seo.config';
import Head from 'next/head';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <GTagManager /> */}
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <DefaultSeo {...config} />

      <ThemeProvider attribute="class" forcedTheme="dark" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Toaster />
          <Progress />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
