
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'
import { getAllPosts } from 'lib/api'

export default function Home({ allPosts: { edges } }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Landing Rich's Arg Example</title>
				<link rel="icon" href="/favicon.ico" />
                <script src="https://app-ab41.marketo.com/js/forms2/js/forms2.min.js"></script>
                <script dangerouslySetInnerHTML={{__html: `MktoForms2 && MktoForms2.loadForm("https://app-ab41.marketo.com", "241-MUE-112", 1369)`,}}
          ></script>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome my demo!</h1>
                <h2>BANNER</h2>
                
            <form id="mktoForm_1369"></form>
            <hr />
				<section>
					{edges.map(({ node }) => (
						<div className={blogStyles.listitem} key={node.id}>
							<div className={blogStyles.listitem__thumbnail}>
								<figure>
									<img
                                        src={node.featuredImage?.node.sourceUrl}
										// src={node.extraPostInfo.thumbImage?.mediaItemUrl}
										alt={node.title}
									/>
								</figure>
							</div>
							<div className={blogStyles.listitem__content}>
								<h2>{node.title}</h2>
								<p>{node.extraPostInfo.authorExcerpt}</p>
								<Link href={`/products/${node.slug}`}>
									<a>Read more</a>
								</Link>
							</div>
						</div>
					))}
				</section>
            
			</main>
			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
	)
}
export async function getStaticProps() {
	const allPosts = await getAllPosts()
	return {
		props: {
			allPosts,
        },
        revalidate: 1
	}
}
