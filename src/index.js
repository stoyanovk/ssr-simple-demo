import React from 'react'
import ReactDOM from 'react-dom'
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom'
import { MainContext } from './components/MainContext/MainContext'

// import App components
import App from './components/App/App'
loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App data={window.__INITIAL_STATE__} />
    </BrowserRouter>,
    document.getElementById('root')
  )
})
