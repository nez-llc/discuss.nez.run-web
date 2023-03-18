import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Container from 'components/layout/Container'
import Account from 'components/member/Account'
import Search from 'components/search/Search'
import { mq } from 'theme'

const Root = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const Menu = styled.nav`
  display: flex;
  gap: 18px;
`

const Links = styled.div`
  display: flex;
  gap: 18px;
  
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
  align-items: center;
`

const Header = () => {
  // const { current } = useNavigation()
  // TODO : active 처리

  return (
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
          </Utils>
        </Menu>
      </Root>
    </Container>
  )
}

export default Header
