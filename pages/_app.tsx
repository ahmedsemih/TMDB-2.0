import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

import { BaseProvider } from '../contexts/baseContext';
import { AuthProvider } from '../contexts/authContext';
import Spinner from '../components/Spinner';
import Layout from '../components/layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // LOADING CONTROL
  useEffect(()=>{
    const handleStart = (url:string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url:string) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
    }
  });

  return (
    <main>
      <Head>
        <title>The Movie Database</title>
        <meta name="description" content="A Movie App. This built with Nextjs, Tailwindcss and TMDB API." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <AuthProvider>
        <BaseProvider>
        {
          loading
          ?
          <Spinner/>
          :
          <Layout>
          <Component {...pageProps} />
        </Layout>
        }
        </BaseProvider>
      </AuthProvider>
    </main>
  )
}

export default MyApp;
