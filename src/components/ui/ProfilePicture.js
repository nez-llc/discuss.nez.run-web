import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: #bbbbbb;
`

const ProfilePicture = ({url}) => (
  <Wrapper>
    {url}
  </Wrapper>
)

export default ProfilePicture
