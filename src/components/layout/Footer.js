import Link from 'next/link'
import styled from '@emotion/styled'
import Container from 'components/layout/Container'

const Wrapper = styled.footer`
  text-align: center;
  padding: 64px 0;
  opacity: 0.6;
`

const Notices = styled.ul`
  padding: 16px 0;
  display: flex;
  gap: 24px;
  justify-content: center;
`

const NoticeItem = styled.li`
`

const Copyright = styled.p`
  padding: 16px 0;
  font-size: 0.8rem;
`

const Footer = () => (
  <Wrapper>
    <Container>
      <Notices>
        <NoticeItem>
          <Link href="/privacy">
            개인정보 취급방침
          </Link>
        </NoticeItem>
        <NoticeItem>
          <Link href="/tos">
            이용약관
          </Link>
        </NoticeItem>
        <NoticeItem>
          <Link href="/coc">
            행동강령
          </Link>
        </NoticeItem>
      </Notices>
      <Copyright>
        Copyright. {new Date().getFullYear()}
      </Copyright>
    </Container>
  </Wrapper>
)

export default Footer
