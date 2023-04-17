import Link from 'next/link'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import HeaderButton from 'components/ui/HeaderButton'
import { useAuth } from 'auth/client'
import MyProfile from 'assets/icons/person.svg?inline'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { mq } from 'theme'

const Wrapper = styled.div`
  margin-left: auto;
  
  display: flex;
  align-items: center;
  gap: 15px;
  
  ${mq.mobile} {
    display: none;
  }
`

const LinkButton = HeaderButton.withComponent(Link)

const MyMenu = styled.div`
  padding: 13px;
  position: absolute;
  top: 80px;
  left: ${({ left }) => left}px;
  width: 127px;
  background: #FFFFFF;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  a, button{
    color: #000;
  }
  
  hr{
    width: 100%;
    margin: 0;
    border: 0;
    border-bottom: 1px solid #C4C4C4;
  } 
`

const Account = () => {
  const { loggedIn, logout } = useAuth()
  const [showMyMenu, setShowMyMenu] = useState(false)
  const [myMenuLeft, setMyMenuLeft] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      setShowMyMenu(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  const handleClick = (event) => {
    const rect = event.target.getBoundingClientRect()

    setMyMenuLeft(rect.left-20)
    setShowMyMenu(!showMyMenu)
  }

  return (
    <Wrapper>
      {loggedIn ? (
        <>
          <HeaderButton onClick={handleClick}>
            <MyProfile /> userName
          </HeaderButton>
          {showMyMenu && (
            <MyMenu left={myMenuLeft}>
              <LinkButton href="/me">프로필</LinkButton>
              <hr />
              <LinkButton href="/me">계정 설정</LinkButton>
              <hr />
              <HeaderButton>로그아웃</HeaderButton>
            </MyMenu>
          )}
        </>
      ) :(
        <>
          <LinkButton href="/signin">
            로그인
          </LinkButton>
        </>
      )}
    </Wrapper>
  )
}

export default Account
