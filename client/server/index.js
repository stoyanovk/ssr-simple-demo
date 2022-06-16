import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { getMarkupFromTree } from '@apollo/client/react/ssr'
import { ChunkExtractor } from '@loadable/server'
import App from '@/components/App/App'

import { getApolloCLient } from './apollo'
import { renderHTML } from './renderHTML'

const app = express()
import 'regenerator-runtime/runtime'

app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static(path.resolve(__dirname, '../static')))

const statsFile = path.resolve('./dist/loadable-stats.json')
const chunkExtractor = new ChunkExtractor({ statsFile })

app.get('*', async (req, res) => {
  try {
    const client = getApolloCLient(req)
    const context = {}

    const appHTML = chunkExtractor.collectChunks(
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.originalUrl}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    )

    const html = await getMarkupFromTree({
      tree: appHTML,
      renderFunction: renderToString
    })

    const indexHTML = renderHTML({
      app: html,
      state: client.extract(),
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
