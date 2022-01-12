import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MainContext } from './components/MainContext/MainContext'

// import App components
import App from './components/App/App'
ReactDOM.hydrate(
  <MainContext initialData={window.__INITIAL_STATE__}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MainContext>,
  document.getElementById('root')
)
