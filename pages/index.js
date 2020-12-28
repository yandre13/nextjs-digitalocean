import Head from 'next/head'

import { getAllPosts, queryPostsClient } from 'lib/api'

// Import css files
import Post from 'components/Post'
import ListOfPosts from 'components/ListPosts'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Hero from 'components/Hero'

const BASE_URL = 'http://back.test/graphql'

const getLastCursor = (arr=[])=>arr.filter((e, i)=>i === arr.length -1 && e)[0]?.cursor
const fetcher = vars => query => request(BASE_URL, query, vars)

export default function Home({ allPosts = [] }) {

    const lastCursor = getLastCursor(allPosts?.posts?.edges)
    const vars = {num: 1000, after: lastCursor}    

    const {data, mutate} = useSWR(queryPostsClient, fetcher(vars))
    
    console.log(data)
    console.log(vars)
      


	return (
        <>
			<Head>
				<title>Landing Rich's Arg Example</title>
				<link rel="icon" href="/favicon.ico" />
                
                <script dangerouslySetInnerHTML={{__html: `
                    MktoForms2 && MktoForms2.loadForm("https://app-ab41.marketo.com", "241-MUE-112", 1396)
                `,}}
                
          ></script>
			</Head>
            <Hero/>
			<main>
				<h1 className="text-center py-4 display-4 font-weight-bold">Landing Rich's Arg Example</h1>
                <div className="px-5">
                    IMAGES
                </div>

                <div className="row">
                        <div className="col-md-6 offset-md-6">
                        <form id="mktoForm_1396"></form>
                        </div>
                </div>
                <hr />
				<section>
                    <h2 className="text-center display-4 font-weight-bold py-3">Contenido</h2>
                    {/*Server*/}
                    <div className="row">
                    {allPosts?.posts?.edges?.map(({ node }) => (
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
            allPosts: allPosts
        },
        revalidate: 1
	}
}
