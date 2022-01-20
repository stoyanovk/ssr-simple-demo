import React, { createContext, useContext } from 'react'

const Context = createContext({})

export const MainContext = ({ children, ssrData = {}, cookies = {} }) => {
  return (
    <Context.Provider value={{ ssrData, cookies }}>{children}</Context.Provider>
  )
}

export const useGetSSRdata = () => useContext(Context).ssrData
export const useCookies = () => useContext(Context).cookies
