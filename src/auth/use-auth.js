import {createContext, useContext, useEffect, useState} from 'react'


const { API_ENDPOINT } = process.env

const UserContext = createContext({})

export const useAuth = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  useEffect(async () => {
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

    setToken(cookies['auth'])
    await refreshUser(cookies['auth']);
  }, [])

  const refreshUser = async token => {
    const response = await fetch(`${API_ENDPOINT}/api/members/my`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) return;
    const user = await response.json()
    setUser(user)
  }

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
        refreshUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


