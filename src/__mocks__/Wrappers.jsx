import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainContext } from '../components/MainContext/MainContext'

export const Wrappers = ({ ssrData = {}, children }) => {
  return (
    <BrowserRouter>
      <MainContext ssrData={ssrData}>{children}</MainContext>
    </BrowserRouter>
  )
}
