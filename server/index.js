const express = require('express')
const fs = require('fs')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')
const { routes } = require('../src/routes')
const App = require('../src/components/App/App').default
const { MainContext } = require('../src/components/MainContext/MainContext')
const app = express()
require('regenerator-runtime/runtime')

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('*', async (req, res) => {
  try {
    let indexHTML = fs.readFileSync(
      path.resolve(__dirname, '../dist/index.html'),
      {
        encoding: 'utf8'
      }
    )
    const currentRoute = routes.find(route => {
      const matchedPath = matchPath(req.url, { path: route.path, exact: true })
      if (matchedPath) {
        req.params = matchedPath.params
      }
      return matchedPath
    })
    const data = await currentRoute.getServerSideData(req, res)
    const context = {}
    const appHTML = ReactDOMServer.renderToString(
      <MainContext initialData={data}>
        <StaticRouter context={context} location={req.originalUrl}>
          <App />
        </StaticRouter>
      </MainContext>
    )

    indexHTML = indexHTML.replace(
      '<div id="root"></div>',
      `<div id="root">${appHTML}</div>
    <script>
      window.__INITIAL_STATE__=${JSON.stringify(data)};
    </script>
    `
    )
    // set header and status
    res.contentType('text/html')
    res.status(200)

    return res.send(indexHTML)
  } catch (e) {
    res.send(e)
  }
})

app.listen('9000', () => {
  console.log('Express server started at http://localhost:9000')
})
