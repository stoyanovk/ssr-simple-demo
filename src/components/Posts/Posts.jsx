import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetSSRdata } from '../MainContext/MainContext'
import { getPosts } from '../../api/posts'
import './style.scss'

const Posts = () => {
  const data = useGetSSRdata()
  const [posts, setPosts] = useState(data?.posts)
  useEffect(() => {
    if (!posts) {
      getPosts().then(data => {
        console.log(data)
        setPosts(data)
      })
    }
  }, [])

  return (
    <div className="ui-post">
      <p className="ui-post__title">Posts Widget</p>
      {posts?.map((post, i) => {
        return (
          <Link key={i} to={`/posts/${post.id}`}>
            <div className="ui-post__body mb">
              <p className="ui-post__body__title">{post.title}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

Posts.getServerSideData = async req => {
  const posts = await getPosts()
  return {
    posts
  }
}

export default Posts
