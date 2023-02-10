import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: inherit;
  height: inherit;
  border-radius: 16px;
  background: #bbbbbb;
  margin: 0;
`

const ProfilePicture = ({url}) => (
  <Wrapper>
    <img src={url} />
  </Wrapper>
)

export default ProfilePicture
