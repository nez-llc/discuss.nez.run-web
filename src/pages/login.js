import React, {useState} from 'react'
import Pane from 'components/layout/Pane'
import TwitterProvider from 'auth/providers/twitter'
import FacebookProvider from 'auth/providers/facebook'
import GitHubProvider from 'auth/providers/github'
import Link from 'next/link'
import {useApi} from 'utils/api';

const signInPopup = async provider => new Promise(async resolve => {
  const authorizeUrl = await provider.getAuthorizeUrl()
  console.log(authorizeUrl)
  const popup = window.open(authorizeUrl, 'newwindow', 'width=500,height=600')

  const timer = setInterval(() => {
    // if (popup.closed) {
    //   clearInterval(timer)
    //
    //   const resultString = getCookie('auth')
    //   const result = JSON.parse(resultString)
    //   console.log(result)
    //   // exchange token
    //
    //   resolve(result)
    // }
  }, 1000)
})

const EmailSignupButton = () => {
  return (
    <div>
      <Link href={'/emailSignup'}>
        <button>이메일 가입</button>
      </Link>
    </div>
  )
}
const EmailLogin = () => {
  const { client } = useApi()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onBadReq = () => {
    alert('존재하지 않는 아이디이거나 패스워드가 일치하지 않습니다.')
  }

  const onLogin = async token => {
    document.cookie = `auth=${token}`
    window.location.replace("/")
  }

  const login = async () => {
    const { code, data } = await client.post(`/api/members/login`, {
      email,
      password
    })

    switch (code) {
      case 200: onLogin(data.token); break
      case 404: onBadReq(); break
    }
  }

  return (
    <div>
      <div>
        <span>이메일 : </span>
        <input value={email} type={'email'}
               onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <span>비밀번호 : </span>
        <input value={password} type={'password'}
               onChange={e => setPassword(e.target.value)}/>
      </div>
      <button onClick={login}>이메일 로그인</button>
    </div>
  )
}

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
          <EmailLogin />
        </li>
        <li>
          <EmailSignupButton />
        </li>
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
