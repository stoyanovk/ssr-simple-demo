import React, { createContext, useContext } from 'react'

const Context = createContext({})

export const MainContext = ({ children, initialData }) => {
  return <Context.Provider value={initialData}>{children}</Context.Provider>
}

export const useGetSSRdata = () => useContext(Context)
