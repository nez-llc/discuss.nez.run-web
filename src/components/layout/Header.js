import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Account from 'components/member/Account'

const Wrapper = styled.header`
  background: white;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadow}
`

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  
  a {
    //text-decoration: none;
  }
`

const Tools = styled.div`
  padding: 10px;
`

const Header = () => (
  <Wrapper>
    <Nav>
      <Link href="/">
        <Logo />
      </Link>
      <Link href="/agenda">
        질문 목록
      </Link>
      <Link href="/reference">
        정책 정보
      </Link>
      <Link href="/search">
        검색
      </Link>
    </Nav>
    <Tools>
      <Account />
    </Tools>
  </Wrapper>
)

export default Header
