import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main>
      <Head>
        <title>The Movie Database</title>
        <meta name="description" content="A Movie App. This built with Nextjs, Tailwindcss and TMDB API." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}

export default MyApp;
