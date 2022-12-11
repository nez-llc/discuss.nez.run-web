import React from 'react'
import styled from '@emotion/styled'

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
    <Notices>
      <NoticeItem>
        <a href="/privacy">
          개인정보 취급방침
        </a>
      </NoticeItem>
      <NoticeItem>
        <a href="/terms">
          이용약관
        </a>
      </NoticeItem>
    </Notices>
    <Copyright>Copyright. 2022</Copyright>
  </Wrapper>
)

export default Footer
