import '../styles/globals.css'
import Root from "../components/layout/Root";

export default function App({ Component, pageProps }) {
  return <Root>
        <Component {...pageProps} />
  </Root>
}
