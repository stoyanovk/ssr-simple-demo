import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetSSRdata } from '../MainContext/MainContext'
import { getPosts } from '../../api/posts'
import { useUrlMapper, useGenerateUrl } from '../../hooks/useUrlMapper'

import { Pagination } from '../Pagination'
import './style.scss'

const Posts = () => {
  const data = useGetSSRdata()
  const { query } = useUrlMapper()
  const generateUrl = useGenerateUrl()
  const [posts, setPosts] = useState(data?.posts)
  const currentPage = Number(query.page) || 1
  useEffect(() => {
    if (!posts) {
      getPosts({ page: currentPage }).then(data => {
        setPosts(data)
      })
    }
  }, [])
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
