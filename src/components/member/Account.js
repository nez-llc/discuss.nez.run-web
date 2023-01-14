import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {useAuth} from 'auth/use-auth'

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
`

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 50px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-left: 15px;
`

const A = styled.a`
  margin: 15px;
`

const Account = () => {
  const { isLogin, logout } = useAuth()

  return (
    <Wrapper>
      {isLogin ? (
        <>
          <Link href="/me">
            <A>마이페이지</A>
          </Link>
          <Button onClick={logout}>
            로그아웃
          </Button>
        </>
      ) : (
        <Link href="/login">
          <a>
            <Button>
              시작하기
            </Button>
          </a>
        </Link>
      )}
    </Wrapper>
  )
}

export default Account
