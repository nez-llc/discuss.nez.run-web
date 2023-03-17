import React from 'react'
import styled from '@emotion/styled'
import LogoImg from 'assets/logo_dark.png'
import MainLogoImg from 'assets/logo_white.png'
import Image from 'next/image'

const Div = styled.div`
  font-size: 26px;
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  
  img{
    height: fit-content;
  }
`

const Logo = (props) => {
  const isMain = props.isMain
  return (
    <Div>
      <Image
        src={isMain ? MainLogoImg : LogoImg} alt={'우동디 로고'}/>
    </Div>
  )
}

export default Logo
