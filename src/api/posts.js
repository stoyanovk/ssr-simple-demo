import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/posts'
export const getPosts = () => {
  return axios.get(URL).then(response => response.data)
}

export const getPost = id => {
  return axios.get(`${URL}/${id}`).then(response => response.data)
}
