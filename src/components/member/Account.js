import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { useAuth } from 'auth/use-auth'

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
`

const Account = () => {
  const { isLogin, logout } = useAuth()

  return (
    <Wrapper>
      {isLogin ? (
        <>
          <Link href="/me">
            <a>마이페이지</a>
          </Link>
          <button onClick={logout}>
            로그아웃
          </button>
        </>
      ) : (
        <Link href="/login">
          <a>로그인</a>
        </Link>
      )}
    </Wrapper>
  )
}

export default Account
