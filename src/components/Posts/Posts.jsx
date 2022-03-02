import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGetSSRdata } from '@/components/MainContext/MainContext'
import { getPosts } from '@/api/posts'
import { useUrlMapper, useGenerateUrl } from '@/hooks/useUrlMapper'

import { Pagination } from '@/components/Pagination'
import './style.scss'

const Posts = () => {
  const data = useGetSSRdata()
  const { query } = useUrlMapper()
  const generateUrl = useGenerateUrl()
  const [posts, setPosts] = useState(data?.posts)
  const currentPage = Number(query.page) || 1
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (!posts) {
      getPosts({ page: currentPage }).then(data => {
        setPosts(data)
      })
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    getPosts({ page: currentPage }).then(data => {
      setPosts(data)
    })
  }, [query.page])

  const nextPageUrl = page => generateUrl({ page })
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
      <Pagination
        currentPage={currentPage}
        perPage={10}
        nextPageUrl={nextPageUrl}
      />
    </div>
  )
}

export default Posts
