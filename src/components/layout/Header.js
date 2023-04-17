import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Container from 'components/layout/Container'
import Account from 'components/member/Account'
import Search from 'components/search/Search'
import MenuIcon from 'assets/icons/menu.svg?inline'
import { mq } from 'theme'
import React from 'react'

const Wrapper = styled.div`
  background: #253362;
`

const Root = styled.header`
  display: flex;
  align-items: center;
  gap: 32px;
  height: 80px;
  padding: 0 20px;
  
  ${mq.mobile} {
    height: 64px;
  }
`

const Menu = styled.nav`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  
  font-size: 17px;
  line-height: 100%;
  color: #FFFFFF;
`

const Links = styled.div`
  display: flex;
  gap: 18px;
  flex-grow: 0;
  
  ${mq.mobile} {
    display: none;
  }
  ${mq.tablet} {
    display: flex;
  }
  
  a {
    text-decoration: none;
  }
`

const Utils = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 8px;
  ${mq.mobile} {
    margin-left: auto;
    flex-grow: 0;
  }
`

const NavMenu = styled.div`
  display: none;
  ${mq.mobile} {
    display: flex;
    align-items: center;  
  }
`

const Header = () => {
  // const { current } = useNavigation()
  // TODO : active 처리

  return (
    <Wrapper>
      <Container>
        <Root>
          <Link href="/">
            <Logo />
          </Link>
          <Menu>
            <Links>
              <Link href="/about">우동디 소개</Link>
              <Link href="/agenda">토론</Link>
              <Link href="/reference">정책위키</Link>
            </Links>
            <Utils>
              <Search />
              <Account />
              <NavMenu>
                <MenuIcon />
              </NavMenu>
            </Utils>
          </Menu>
        </Root>
      </Container>
    </Wrapper>
  )
}

export default Header
