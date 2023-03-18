import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie,removeCookies } from 'cookies-next'
import { useApi } from 'utils/api'

const UserContext = createContext({})

export const useAuth = () => useContext(UserContext)

const signInPopup = async provider => new Promise(resolve => {
  provider.getAuthorizeUrl().then(authorizeUrl => {
    const popup = window.open(authorizeUrl, 'newwindow', 'width=500,height=600')
    const timer = setInterval(() => {
      if (popup.closed) {
        clearInterval(timer)
        // TODO : 지금은 유저 토큰이지만 이후엔 refresh 토큰만 쿠키에서 읽고 유저 토큰은 exchange후 메모리만 저장
        const token = getCookie('auth')
        resolve({
          token,
        })
      }
    }, 1000)
  })
})

export const UserProvider = ({ children }) => {
  const { client } = useApi()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})

  const readToken = () => {
    const token = getCookie('auth')
    if (!token) {
      setLoading(false)
      return
    }
    setToken(token)
  }

  const fetchUser = async () => {
    const { code, data } = await client.get('/api/members/my')

    if (code !== 200) {
      // TODO : 적절한 오류 표시
    }

    setUser(data)
    setLoading(false)
  }

  useEffect(() => {
    readToken()
  }, [])

  useEffect(() => {
    if (!token) return
    client.setToken(token)
    fetchUser(token)
  }, [token])

  const loggedIn = !!token

  const logout = () => {
    setToken('')
    setUser(null)
    removeCookies('auth')
  }

  const onUnauthorized = () => {
    // TODO : 로그인 필요하다는 안내 띄움
    // TODO : 로그인 모달 띄움
  }

  return (
    <UserContext.Provider
      value={{
        onUnauthorized,
        signInPopup,
        logout,
        loading,
        token,
        user,
        loggedIn,
        refresh: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
