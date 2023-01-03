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
            마이페이지
          </Link>
          <button onClick={logout}>
            로그아웃
          </button>
        </>
      ) : (
        <Link href="/login">
          로그인
        </Link>
      )}
    </Wrapper>
  )
}

export default Account
