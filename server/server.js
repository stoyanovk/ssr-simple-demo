const express = require('express')
const path = require('path')
const React = require('react')
const { renderToString } = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')
const { ChunkExtractor } = require('@loadable/server')

const webpack = require('webpack')
const getWPConfig = require('../webpack.config.js')
const config = getWPConfig({}, { mode: 'development' })
const compiler = webpack(config)

const { routes } = require('../src/routes')
const App = require('../src/components/App/App').default
const renderHTML = require('./renderHTML')

const app = express()
// app.use(express.static(path.resolve(__dirname, '../static')))

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const devServer = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: true
})
app.use(devServer)

app.use(webpackHotMiddleware(compiler))

// app.use(express.static(path.resolve(__dirname, '../dist')))
const statsFile = path.resolve('./dist/loadable-stats.json')
console.log(statsFile)
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
