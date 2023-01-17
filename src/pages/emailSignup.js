import React, {useState} from 'react'
import {useApi} from 'utils/api'
import styled from '@emotion/styled'

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`

const EmailSignup = () => {
  const { client } = useApi()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

  const onEdited = async token => {
    alert('가입되었습니다.')
    document.cookie = `auth=${token}`
    window.location.replace("/")
  }

  const onBadReq = () => {
    alert('유효하지 않은 값입니다.')
  }
  const onLocked = () => {
    alert('중복된 이메일입니다.')
  }
  const editProfile = async () => {
    if (!emailRegex.test(email)) {
      alert('유효하지 않은 이메일입니다.')
      return
    }
    if (password.length < 6) {
      alert('패스워드 길이는 6자 이상이어야 합니다.')
      return
    }
    if (nickname.length < 2) {
      alert('닉네임 길이는 2자 이상이어야 합니다.')
      return
    }
    const { code, data } = await client.post(`/api/members/signup`, {
      email,
      password,
      nickname
    })
    console.log(data)

    switch (code) {
      case 200: onEdited(data.token); break
      // case 400: onBadRequest(data) break
      case 400: onBadReq(); break
      case 423: onLocked(); break
      // case 500:
      // default:
      //   onServerError(data)
      //   break
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
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
      <div>
        <span>닉네임 : </span>
        <input value={nickname}
               onChange={e => setNickname(e.target.value)}/>
      </div>
      <button onClick={editProfile} style={{display: 'block'}}>저장</button>
    </div>
  )
}

export default EmailSignup
