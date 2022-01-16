import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSSRdata } from '../MainContext/MainContext'
import { getPost } from '../../api/posts'
import './style.scss'

const Post = () => {
  const data = useGetSSRdata()
  const [post, setPost] = useState(data?.post)
  const { id } = useParams()
  useEffect(() => {
    if (!post) {
      getPost(id).then(data => {
        setPost(data)
      })
    }
  }, [])
  return (
    <div className="ui-post">
      <p className="ui-post__title">Post Widget</p>
      {post && (
        <div className="ui-post__body">
          <p className="ui-post__body__title">{post.title}</p>
          <p className="ui-post__body__description">{post.body}</p>
        </div>
      )}
    </div>
  )
}

export default Post
