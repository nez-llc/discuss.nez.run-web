import React, { useEffect } from 'react'
import Pane from 'components/layout/Pane'
import { getCookie } from 'cookies-next'
import TwitterProvider from 'auth/providers/twitter'
import FacebookProvider from 'auth/providers/facebook'
import GitHubProvider from 'auth/providers/github'

const signInPopup = async provider => new Promise(async resolve => {
  const authorizeUrl = await provider.getAuthorizeUrl()
  console.log(authorizeUrl)
  const popup = window.open(authorizeUrl, 'newwindow', 'width=500,height=600')

  const timer = setInterval(() => {
    if (popup.closed) {
      clearInterval(timer)

      const resultString = getCookie('auth')
      const result = JSON.parse(resultString)
      console.log(result)
      // exchange token

      resolve(result)
    }
  }, 1000)
})

const TwitterLoginButton = () => {
  const start = async () => {
    const result = await signInPopup(TwitterProvider)
    console.log(result)
  }

  return (
    <div>
      <button onClick={start}>트위터</button>
    </div>
  )
}

const FacebookLoginButton = () => {
  const startLogin = async () => {
    const result = await signInPopup(FacebookProvider)
    console.log(result)
  }

  return (
    <div>
      <button onClick={startLogin}>페이스북</button>
    </div>
  )
}

const GitHubLoginButton = () => {
  const startLogin = async () => {
    const result = await signInPopup(GitHubProvider)
    console.log(result)
  }

  return (
    <div>
      <button onClick={startLogin}>GitHub</button>
    </div>
  )
}


const Login = () => {
  return (
    <Pane>
      <ul>
        <li>
          <TwitterLoginButton />
        </li>
        <li>
          <FacebookLoginButton />
        </li>
        <li>
          <GitHubLoginButton />
        </li>
      </ul>
    </Pane>
  )
}

export default Login
