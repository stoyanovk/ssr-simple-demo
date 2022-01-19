import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/posts'
export const getPosts = ({ page = 1, limit = 10 }) => {
  return axios
    .get(`${URL}?_limit=${limit}&_page=${page}`)
    .then(response => response.data)
}

export const getPost = id => {
  return axios.get(`${URL}/${id}`).then(response => response.data)
}
