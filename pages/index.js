import Head from 'next/head'

import {getAllPosts, queryPostsClient} from 'lib/api'

// Import css files
import Post from 'components/Post'
import ListOfPosts from 'components/ListPosts'
import useSWR from 'swr'
import {request} from 'graphql-request'
import Hero from 'components/Hero'

const getLastCursor = (arr = []) =>
	arr.filter((e, i) => i === arr.length - 1 && e)[0]?.cursor
const fetcher = vars => query =>
	request(process.env.NEXT_PUBLIC_WP_API_URL, query, vars)

export default function Home({allPosts = []}) {
	const lastCursor = getLastCursor(allPosts?.posts?.edges)
	const vars = {num: 1000, after: lastCursor}

	const {data} = useSWR(queryPostsClient, fetcher(vars))

	console.log(data)
	console.log(vars)

	return (
		<>
			<Head>
				<title>Gana con Rich's</title>
				<link rel="icon" href="/favicon.ico" />
				<script
					dangerouslySetInnerHTML={{
						__html: `
                    MktoForms2 && MktoForms2.loadForm("https://app-ab41.marketo.com", "241-MUE-112", 1396)
                `,
					}}
				></script>
			</Head>
			<Hero />
			<main className="container">
				<div className="row">
					<div className="col-md-6 offset-md-6">
						<form id="mktoForm_1396"></form>
					</div>
				</div>
				<hr />
				<section>
					<h2 className="text-center display-4 font-weight-bold py-3">
						Contenido
					</h2>
					{/*Server*/}
					<div className="row">
						{allPosts?.posts?.edges?.map(({node}) => (
							<Post key={node.id} node={node} />
						))}
					</div>
					{/*Client*/}
					<ListOfPosts data={data} />
				</section>
			</main>
			<footer className={'next'}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel Logo" className={'next'} />
				</a>
			</footer>
		</>
	)
}
export async function getStaticProps() {
	const allPosts = await getAllPosts(5)

	return {
		props: {
			allPosts: allPosts,
		},
		revalidate: 1,
	}
}
