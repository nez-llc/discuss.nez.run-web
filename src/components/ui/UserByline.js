import React from 'react'
import styled from '@emotion/styled'
import ProfilePicture from 'components/ui/ProfilePicture'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Name = styled.h4`
  font-weight: normal;
`

const UserByline = () => (
  <Wrapper>
    <ProfilePicture />
    <Name>name</Name>
  </Wrapper>
)

export default UserByline
