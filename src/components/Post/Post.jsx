import React from 'react'
import axios from 'axios'
import { useGetSSRdata } from '../MainContext/MainContext'
import './style.scss'

const Post = () => {
  const data = useGetSSRdata()
  console.log(data)
  return (
    <div className="ui-post">
      <p className="ui-post__title">Post Widget</p>
      <div className="ui-post__body">
        <p className="ui-post__body__title">{data.title}</p>
        <p className="ui-post__body__description">{data.body}</p>
      </div>
    </div>
  )
}

Post.getServerSideData = req => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then(response => {
      return {
        title: response.data.title,
        body: response.data.body
      }
    })
}

export default Post
