import 'styles/globals.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'next-themes'


const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #fff;
    --text-color: #333;
    --header-height: 66px;
  }

  [data-theme="dark"] {
    --bg: #000;
    --text-color: #fff;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body{
      transition: all .5s ease;
      background: var(--bg);
  }
`

function MyApp({ Component, pageProps}) {
	return (
        <>
            <GlobalStyle />
            <Head>
            <script src="https://app-ab41.marketo.com/js/forms2/js/forms2.min.js"></script>
            </Head>
            {/* <ThemeProvider> */}
                <Component {...pageProps} />
            {/* </ThemeProvider> */}
        </>
    )
}

export default MyApp
