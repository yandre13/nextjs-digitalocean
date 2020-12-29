import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Card from 'react-bootstrap/Card'

const Post = ({node}) => {
	return (
		<div className="col-12 col-md-4 col-lg-3 pt-1 pb-4">
			<Card>
				<Link href={`/products/${node.slug}`} scroll={false}>
					<a>
						<Image
							src={node.featuredImage?.node.sourceUrl}
							alt={node.title}
							height={140}
							width={200}
							layout="responsive"
							style={{objectFit: 'cover'}}
						/>
					</a>
				</Link>

				<Card.Body>
					<Card.Title>{node.title}</Card.Title>
				</Card.Body>
			</Card>
		</div>
	)
}

export default React.memo(Post)
