import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
`

const Account = () => {
  return (
    <Wrapper>
      <Link href="/login">
        <a>로그인</a>
      </Link>
    </Wrapper>
  )
}

export default Account
