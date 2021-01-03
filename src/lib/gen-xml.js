require('dotenv').config({path: '.env.local'})
const fs = require('fs')
const axios = require('axios')

const capitalizeFirstLetter = string =>
	string[0].toUpperCase() + string.slice(1)

const getAllPostsXmlData = async () => {
	const query = `
    query AllPosts {
      posts(where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            date
            title
            slug
            content
            excerpt
          }
        }
      }
    }
		`
	const headers = {'Content-Type': 'application/json'}
	const allPosts = await axios({
		method: 'post',
		url: process.env.WP_API_URL,
		headers,
		data: JSON.stringify({query}),
	})

	return allPosts.data.data.posts.edges
}

const generateRssItem = ({node: post}) => `
		<item>
			<guid>${process.env.SITE_URL}/products/${post.slug}</guid>	
			<title>${post.title}</title>
			<link>${process.env.SITE_URL}/products/${post.slug}</link>		
			<description>${post.excerpt}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`

// Edit the '<link>' and '<description>' data here to reflect your own website details!
const generateRss = posts => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Gana con Rich's Landing page</title>
		<link>${process.env.SITE_URL}</link>
		<description>Gana con Rich's. Participa en un sorteo ingresando nuestro formulario</description>
		<language>es</language>
		<lastBuildDate>${new Date(posts[0].node.date).toUTCString()}</lastBuildDate>
		<atom:link href="${
			process.env.SITE_URL
		}/rss.xml" rel="self" type="application/rss+xml"/>${posts
	.map(generateRssItem)
	.join('')}
	</channel>
</rss>`

const generateSitemapItem = ({node: post}) => `
  <url>
    <loc>${process.env.SITE_URL}/products/${post.slug}</loc>
    <lastmod>${new Date(post.date).toUTCString()}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`

const generateSitemap = posts => `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${process.env.SITE_URL}/</loc>
		<changefreq>monthly</changefreq>
	</url>
	<url>
		<loc>${process.env.SITE_URL}/products</loc>
		<lastmod>${new Date(posts[0].node.date).toUTCString()}</lastmod>
		<changefreq>weekly</changefreq>
	</url>${posts.map(generateSitemapItem).join('')}
</urlset>
`

const VALID_NAMES = ['sitemap', 'rss']
async function generateXmlFile(name) {
	if (!VALID_NAMES.includes(name)) {
		throw new Error(`name must be ${VALID_NAMES[0]} or ${VALID_NAMES[1]}`)
	}
	const allPostsData = await getAllPostsXmlData()
	const processedXml =
		name === 'rss' ? generateRss(allPostsData) : generateSitemap(allPostsData)
	fs.writeFile(`./public/${name}.xml`, processedXml, err => {
		if (err) {
			console.log(err)
		} else {
			console.log(`${capitalizeFirstLetter(name)} file written successfully`)
		}
	})
}

generateXmlFile('rss')
generateXmlFile('sitemap')
module.exports = {generateXmlFile, VALID_NAMES}
