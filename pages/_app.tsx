import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Turn off server-side rendering to remove the flash of unstyled content (FOUC)
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

