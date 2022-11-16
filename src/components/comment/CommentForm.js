import React from 'react'
import ProfilePicture from 'components/ui/ProfilePicture'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  max-width: 100%;
`

const SubmitButton = styled.button`
  
`

const CommentForm = () => {
  return (
    <Wrapper>
      <ProfilePicture />
      <Textarea></Textarea>
      <SubmitButton>등록</SubmitButton>
    </Wrapper>
  )
}

export default CommentForm
