import '../styles/globals.css'
import type { AppProps } from 'next/app'

function PokemonApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default PokemonApp
