import React from 'react'

//
import Post from 'components/Post'

const ListOfPosts = ({data}) => {
    return (
        <div className="row">
            {data?.posts?.edges?.map(({ node }) => (
                <Post key={node.id} node={node} />
            ))}
        </div>
    )
}

export default ListOfPosts
