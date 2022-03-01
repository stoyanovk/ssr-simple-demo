import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'

// import App components
import App from './components/App/App'
loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App ssrData={window.__INITIAL_STATE__} />
    </BrowserRouter>,
    document.getElementById('root')
  )
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(r => {
        console.log(r.scope)
      })
      .catch(e => {
        console.log(e)
      })
  })
}
