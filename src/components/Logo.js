import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import LogoLight from 'assets/logo_light.svg'
import LogoDark from 'assets/logo_dark.svg'

const Div = styled.div`
  font-size: 26px;
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  
  img {
    width: 100%;
    height: fit-content;
  }
`

const Logo = ({ dark=true }) => (
  <Div>
    <Image
      src={dark ? LogoDark : LogoLight}
      alt="우동디"
    />
  </Div>
)

export default Logo
