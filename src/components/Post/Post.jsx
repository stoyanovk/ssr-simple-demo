import React, { useEffect, useState } from 'react'
import { useGetSSRdata } from '@/components/MainContext/MainContext'
import { getPost } from '@/api/posts'
import { useUrlMapper } from '@/hooks/useUrlMapper'
import './style.scss'

const Post = () => {
  const data = useGetSSRdata()
  const [post, setPost] = useState(data?.post)
  const { params } = useUrlMapper()
  useEffect(() => {
    if (!post) {
      getPost(params.id).then(data => {
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
