import React, { useState } from 'react'
import ProfilePicture from 'components/ui/ProfilePicture'
import styled from '@emotion/styled'
import { client } from 'utils/api'

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

const CommentForm = ({ agenda }) => {
  const [comment, setComment] = useState('')

  const onUnauthorized = () => {
    // TODO : 조금 더 예쁜 alert 띄우기
    alert('로그인이 필요합니다.')
  }

  const saveComment = async () => {
    const { code, data } = await client.post(`/api/agendas/${agenda.id}/comments`, {
      comment,
    })

    switch (code) {
      // case 202: onSaved(data) break
      // case 400: onBadRequest(data) break
      case 401: onUnauthorized(data); break
      // case 500:
      // default:
      //   onServerError(data)
      //   break
    }
  }

  return (
    <Wrapper>
      <ProfilePicture />
      <Textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <SubmitButton onClick={saveComment}>등록</SubmitButton>
    </Wrapper>
  )
}

export default CommentForm
