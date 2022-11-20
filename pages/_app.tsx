import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
  <main>
    <Head>
      <title>Movie App</title>
      <meta name="description" content="A Movie App. This built with Nextjs, Tailwindcss and TMDB API." />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
    <Component {...pageProps} />
  </main>
  )
}

export default MyApp;
