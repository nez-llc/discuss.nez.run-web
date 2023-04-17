import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Container from 'components/layout/Container'
import Account from 'components/member/Account'
import Search from 'components/search/Search'
import MenuIcon from 'assets/icons/menu.svg?inline'
import Close from 'assets/icons/close.svg?inline'
import { mq } from 'theme'
import React, {useState} from 'react'
import FeaturedTags from 'components/ui/FetuasTags'

const Wrapper = styled.div`
  background: #253362;
  
  ${({isNav}) => isNav && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  `}
`

const Root = styled.header`
  display: flex;
  align-items: center;
  gap: 32px;
  height: 80px;
  
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

const MobileNavMenu = styled.div`
  background: #fff;
  position: absolute;
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 36px;
  
  overflow-y: scroll;
  
  dl{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  dt{
    font-weight: 500;
    font-size: 15px;
    color: #828282;
  }
  
  dd{
    padding-left: 20px;
  }
`

const NavLinks = styled(Links)`
  display: block;
  font-weight: 700;
  font-size: 20px;
  color: #09101D;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
  }
`

const Header = () => {
  // const { current } = useNavigation()
  // TODO : active 처리
  const [isNav, setisNav] = useState(false)
  const [navHeight, setNavHeight] = useState(0)

  const openNavMenu = () => {
    document.body.style.overflow = 'hidden'
    const windowHeight = window.innerHeight
    setNavHeight(windowHeight)
    setisNav(true)
  }

  const closeNavMenu = () => {
    document.body.style.overflow = 'auto'
    setisNav(false)
  }

  return (
    <Wrapper isNav={isNav} height={navHeight}>
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
              {isNav ?
                <NavMenu>
                  <Close onClick={closeNavMenu}/>
                </NavMenu>
                :
                <>
                  <Search />
                  <Account />
                  <NavMenu>
                    <MenuIcon onClick={openNavMenu} />
                  </NavMenu>
                </>
              }
            </Utils>
          </Menu>
        </Root>
      </Container>
      {isNav &&
        <MobileNavMenu height={navHeight}>
          <dl>
            <dt>마이페이지</dt>
            <dd><Account isNav={isNav}/></dd>
          </dl>
          <dl>
            <dt>토론 살펴보기</dt>
            <dd><FeaturedTags view={'nav'}/></dd>
          </dl>
          <NavLinks>
            <Link href="/about">우동디 소개</Link>
          </NavLinks>
        </MobileNavMenu>
      }
    </Wrapper>
  )
}

export default Header
