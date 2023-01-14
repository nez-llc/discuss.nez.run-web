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
  //padding: 8px;
  //box-shadow: ${({ theme }) => theme.shadow};
  padding: 0 100px;
  border-bottom: 1px solid black;
  height: 75px;
  @media screen and (max-width: 900px) {
    padding: 0 15px;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  flex-grow: 1;
  position: relative;
  a {
    text-decoration: none;
    cursor: pointer;
  }
`

const Tools = styled.div`
  padding: 10px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`

const NavBox = styled.div`
  align-items: center;
  display: flex;
  right: 0;
  position: absolute;
  margin-top: 7px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`

const A = styled.a`
  margin: 0 15px;
`

const Header = () => (
  <Wrapper>
    <Nav>
      <Link href="/">
        <a><Logo /></a>
      </Link>
      <NavBox>
        <Link href="/agenda">
          <A>질문 목록</A>
        </Link>
        <Link href="/reference">
          <A>정책 정보</A>
        </Link>
        <Link href="/search">
          <A>검색</A>
        </Link>
      </NavBox>
    </Nav>
    <Tools>
      <Account />
    </Tools>
  </Wrapper>
)

export default Header
