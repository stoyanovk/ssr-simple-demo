const axios = require('axios')

const request = url => {
  return axios
    .get(`https://jsonplaceholder.typicode.com${url}`)
    .then(res => res.data)
}

exports.request = request
