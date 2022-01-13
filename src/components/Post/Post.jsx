import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useGetSSRdata } from '../MainContext/MainContext'
import './style.scss'

const getPost = id => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.data)
}

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

Post.getServerSideData = req => {
  return getPost(req.params.id).then(post => {
    return {
      post
    }
  })
}

export default Post
