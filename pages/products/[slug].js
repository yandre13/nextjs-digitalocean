import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
//data
import { getAllPostsWithSlug, getPost } from 'lib/api'
//styles
import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'

export default function Post({ postData = {} }) {
	const router = useRouter()

	if (!router.isFallback && !postData?.slug) {
		return <p>hmm... looks like an error :c</p>
	}

	const formatDate = (date) =>
		`${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(
			date
		).getFullYear()}`

	return (
		<div className={styles.container}>
			<Head>
				<title>{postData.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{router.isFallback ? (
					<h2>Loading...</h2>
				) : (
					<article className={blogStyles.article}>
						<div className={blogStyles.postmeta}>
							<h1 className={styles.title}>{postData.title}</h1>
							<p>{formatDate(postData.date)}</p>
                            <img src={postData.featuredImage.node.sourceUrl} alt={postData.title} />
						</div>
						<div
							className="post-content content"
							dangerouslySetInnerHTML={{ __html: postData.content }}
						/>
					</article>
				)}
				<p>
					<Link href="/">
						<a>back Home</a>
					</Link>
				</p>
			</main>
		</div>
	)
}

export async function getStaticPaths() {
	const allPosts = await getAllPostsWithSlug()
	return {
		paths: allPosts.edges.map(({ node }) => `/products/${node.slug}`) || [],
		fallback: true,
	}
}

export async function getStaticProps({ params }) {
	const data = await getPost(params.slug)
	return {
		props: {
			postData: data.post,
        },
        revalidate: 1
	}
}
