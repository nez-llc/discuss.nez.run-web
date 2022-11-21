import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({})

export const useAuth = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    const readCookie = () => {
      const cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => {
          acc[key.trim()] = decodeURIComponent(value)
          return acc
        }, {})

      return cookies
    }

    const cookies = readCookie()

    if (!cookies['auth']) return

    const { data } = JSON.parse(cookies['auth'])
    setToken(data.token)
  }, [])

  // const refreshUser = async () => {
  //   const response = await fetch('/api/auth/user', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   const user = await response.json()
  //   setUser(user)
  // }

  const isLogin = !!token

  const logout = () => {
    setToken('')
    setUser({})
    document.cookie = 'auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        logout,
        isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


