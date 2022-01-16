const express = require('express')
const path = require('path')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')
const { routes } = require('../src/routes')
const { ChunkExtractor } = require('@loadable/server')
const App = require('../src/components/App/App').default

import { renderHTML } from './renderHTML'
const app = express()
require('regenerator-runtime/runtime')

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../static')))

const statsFile = path.resolve('./dist/loadable-stats.json')
const chunkExtractor = new ChunkExtractor({ statsFile })

app.get('*', async (req, res) => {
  try {
    const currentRoute = routes.find(route => {
      const matchedPath = matchPath(req.url, { path: route.path, exact: true })
      if (matchedPath) {
        req.params = matchedPath.params
      }
      return matchedPath
    })

    const data = await currentRoute.getServerSideData(req, res)
    const context = {}

    const appHTML = renderToString(
      chunkExtractor.collectChunks(
        <StaticRouter context={context} location={req.originalUrl}>
          <App data={data} />
        </StaticRouter>
      )
    )

    const indexHTML = renderHTML({
      app: appHTML,
      state: JSON.stringify(data),
      chunkExtractor
    })

    res.contentType('text/html')
    res.status(200)

    return res.send(indexHTML)
  } catch (e) {
    console.log(e, 'error')
    res.send(e)
  }
})

app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000')
})
