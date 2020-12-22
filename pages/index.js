
import {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import blogStyles from 'styles/Blog.module.css'
import { fetchPro, getAllPosts, getAllSlides, query2Posts } from 'lib/api'

// Import css files

import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'

import Card from 'react-bootstrap/Card'
import { usePagination } from 'src/hooks/useSome'
import { useNearScreen } from 'src/hooks/useLazy'
import Post from 'src/components/Post'
import ListOfPosts from 'src/components/ListPosts'
const BASE_URL = 'http://back.test/graphql'

const limit = 4
const getLastCursor = (arr=[])=>arr.filter((e, i)=>i === arr.length -1 && e)[0]?.cursor

export default function Home({ allPosts = [], allSlides = [] }) {

    const lastCursor = getLastCursor(allPosts?.posts?.edges)
    const [state, setState] = useState({ended: false, cursor: lastCursor})
    const {cursor, ended} = state
    
    const {fromRef, nearScreen, initialized} = useNearScreen(false, {margin: '100px', over: ended})
    
    const query = {
        query: `
        query AllPosts($num: Int, $after: String) {
            posts(first: $num, after: $after, where: { orderby: { field: DATE, order: ASC}}) {
             edges {
              cursor
              node {
               id
               date
               title
               slug
               featuredImage{
                node{
                  sourceUrl
                }
              }
               extraPostInfo {
                authorExcerpt
                thumbImage {
                 mediaItemUrl
                }
               } 
              }
             }
            }
           }
        `,
        variables: {num: limit, after: cursor}
    }
    // const data = {}
    const {data, error, status} = usePagination(query, initialized)
    
    
    
    
    const params = {
        // lazy: true,
        slidesPerView: 1,
        // spaceBetween: 30,
        loop: true,
        // effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }

      

      
    console.log('loading', status)
    
    useEffect(()=>{
        if(status !== 'ended'){
            return
        }
        setState(prev=>({...prev, ended: true}))
    }, [status])
    useEffect(()=>{
        if(!nearScreen){
            return
        }
        const timing = setTimeout(()=>{
            if(initialized && status === 'resolved'){
                setState(prev=>({...prev, cursor: getLastCursor(data?.posts?.edges)}))
            }
        }, 400)
        return ()=> clearTimeout(timing)
    }, [nearScreen])

	return (
		<div className="container">
			<Head>


				<title>Landing Rich's Arg Example</title>
				<link rel="icon" href="/favicon.ico" />
                
                <script dangerouslySetInnerHTML={{__html: `
                    MktoForms2 && MktoForms2.loadForm("https://app-ab41.marketo.com", "241-MUE-112", 1396)
                `,}}
                
          ></script>
			</Head>

			<main>
				<h1 className="text-center py-4 display-4 font-weight-bold">Landing Rich's Arg Example</h1>
                <div className="px-5">
                    <Swiper {...params}>
                        {allSlides.map(({ node }) => (
                        <div key={node.title} className="text-center container px-5">
                            <div className={blogStyles.img_container}>
                                <img
                                    alt={node.title}
                                    src={node.featuredImage.node.sourceUrl} style={{ objectFit: 'cover' }} />
                            </div>
                            {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white" /> */}
                            <div className="py-1 pb-3">
                                <h3>{node.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                            </div>
                        </div>
                        ))}
                    </Swiper>
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
                    
                    <button ref={fromRef} onClick={()=>{
                        setCursor(getLastCursor(data?.posts?.edges))
                    }}>
                        CLOKC
                    </button>
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
    const allPosts = await getAllPosts(),
     allSlides = await getAllSlides()
	return {
		props: {
            allPosts: allPosts,
            allSlides: allSlides.edges 
        },
        revalidate: 1
	}
}
