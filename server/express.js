const express = require('express')
const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const App = require('../src/components/App/App').default
console.log(App)
const app = express()

app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, '../dist'))
)

app.use('*', (req, res) => {
  // read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    {
      encoding: 'utf8'
    }
  )

  let appHTML = ReactDOMServer.renderToNodeStream(
    <StaticRouter location={req.originalUrl}>
      <App />
    </StaticRouter>
  )

  indexHTML = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${appHTML}</div>`
  )

  // set header and status
  res.contentType('text/html')
  res.status(200)

  return res.send(indexHTML)
})

app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000')
})
