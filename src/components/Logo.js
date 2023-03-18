import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import logoDark from 'assets/logo_dark.png'
import logoLight from 'assets/logo_white.png'

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

const Logo = ({ dark=false }) => (
  <Div>
    <Image
      src={dark ? logoLight : logoDark}
      alt="우동디"
    />
  </Div>
)

export default Logo
