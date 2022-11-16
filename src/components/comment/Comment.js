import React from 'react'
import styled from '@emotion/styled'
import ProfilePicture from 'components/ui/ProfilePicture'

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
`

const Name = styled.h3`
  padding: 2px 0;
  font-size: 16px;
`

const Content = styled.div`
`

const Comment = () => (
  <Wrapper>
    <ProfilePicture />
    <div>
      <Name>writer</Name>
      <p>text text text</p>
    </div>
  </Wrapper>
)

export default Comment
