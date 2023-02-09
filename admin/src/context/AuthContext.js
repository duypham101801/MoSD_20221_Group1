/* eslint-disable react/react-in-jsx-scope */
import { createContext, useEffect, useState } from 'react'
import { auth } from '../config/Firebase'

import User from 'firebase'

export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    /*
    const unsub = auth.onAuthStateChanged((user) => {
      user && setCurrentUser(user)
    })

    return () => {
      unsub()
    }   */
  }, [])

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}
