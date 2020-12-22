import 'styles/globals.css'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp({ Component, pageProps}) {
	return (
        <>
            <Head>
            <script src="https://app-ab41.marketo.com/js/forms2/js/forms2.min.js"></script>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
