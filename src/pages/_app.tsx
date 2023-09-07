import '@/styles/globals.css';
import '@/styles/nprogress.css';
import 'driver.js/dist/driver.css';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/components/ui/toaster';
import { Progress } from '@/components/nprogress';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster />
        <Progress />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
