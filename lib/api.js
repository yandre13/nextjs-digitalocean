
const API_URL = process.env.WP_API_URL

export async function fetchAPI(query, { variables } = {}) {
	// Set up some headers to tell the fetch call
	const headers = { 'Content-Type': 'application/json' }
	// build out the fetch() call using the API_URL
	// environment variable pulled in at the start
	// Note the merging of the query and variables
	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({ query, variables }),
	})
	// error handling work
	const json = await res.json()
	if (json.errors) {
		console.log(json.errors)
		console.log('error details', query, variables)
		throw new Error('Failed to fetch API')
	}
	return json.data
}

// Notice the 'export' keyword here. We'll be calling this function
// directly in our blog/index.js page, so it needs to be exported
export async function getAllPosts(preview) {
	const data = await fetchAPI(
		`
   query AllPosts {
    posts(first: 4, where: { orderby: { field: DATE, order: ASC}}) {
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
 `
	)
	return data
}

export async function getAllPostsWithSlug() {
	const data = await fetchAPI(
		`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `
	)
	return data?.posts
}

export async function getPost(slug) {
	const data = await fetchAPI(
		`
   fragment PostFields on Post {
    title
    excerpt
    slug
    date
    featuredImage {
     node {
      sourceUrl
     }
    }
   }
   query PostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
     ...PostFields
     content
    }
   }
  `,
		{
			variables: {
				id: slug,
				idType: 'SLUG',
			},
		}
	)

	return data
}

export async function getAllSlides() {
    const data = await fetchAPI(`
    query AllSlides{
        slides(first: 1000, where: {orderby: {field: DATE, order: ASC}}) {
          edges {
            node {
              title
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              buttonInfo {
                title
                link
              }
            }
          }
        }
      }      
    `)
    return data?.slides
}



export const query2Posts = `
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
`
const headers = { 'Content-Type': 'application/json' }

export const fetchPro = async(query) => {

    const options = {
      headers : headers,
      method: 'POST',
      body: query
    };
    const res = await fetch('http://back.test/graphql', options)
    const resJson = await res.json();
    if(resJson.errors) {
        throw(JSON.stringify(resJson.errors));
    }
    return resJson.data;
  }