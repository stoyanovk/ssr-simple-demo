import React, { useEffect, useState } from 'react'
import { useGetSSRdata } from '@/components/MainContext/MainContext'
import { getPost } from '@/api/posts'
import { useUrlMapper } from '@/hooks/useUrlMapper'
import s from './style.css'

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
    <div className={s.post}>
      <p className={s.title}>Post Widget</p>
      {post && (
        <div className={s.body}>
          <p className={s.bodyTitle}>{post.title}</p>
          <p className={s.description}>{post.body}</p>
        </div>
      )}
    </div>
  )
}

export default Post
