import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { routes } from '../src/routes'
import { ChunkExtractor } from '@loadable/server'
import App from '../src/components/App/App'

import { renderHTML } from './renderHTML'
const app = express()
import 'regenerator-runtime/runtime'

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../static')))

const statsFile = path.resolve('./dist/loadable-stats.json')
const chunkExtractor = new ChunkExtractor({ statsFile })

app.get('*', async (req, res) => {
  try {
    const currentRoute = routes.find(route => {
      const matchedPath = matchPath(req.path, {
        path: route.path,
        exact: true
      })
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
          <App ssrData={data} />
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
