import React, {useState} from 'react'
import styled from '@emotion/styled'
import ProfilePicture from 'components/ui/ProfilePicture'
import {useApi} from 'utils/api'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  max-width: 100%;
  width: 100%;
  resize: none;
`

const SubmitButton = styled.button`
  background-color: #FF6861;
  border: 0;
  color: #fff;
  font-size: 12px;
  width: 50px;
  height: 30px;
`

const CommentForm = ({ agendaId, onCreated }) => {
  const { client } = useApi()
  const [content, setContent] = useState('')

  const onUnauthorized = () => {
    // TODO : 조금 더 예쁜 alert 띄우기
    alert('로그인이 필요합니다.')
  }

  const onSaved = () => {
    alert('덧글이 등록되었습니다.')
    onCreated && onCreated()
    setContent('')
  }

  const saveComment = async () => {
    if (!content) {
      alert('덧글을 입력해주세요.')
      return
    }
    const { code, data } = await client.post(`/api/agendas/${agendaId}/comments`, {
      content,
    })

    switch (code) {
      case 201: onSaved(data); break
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
      {/* <ProfilePicture /> */}
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <SubmitButton onClick={saveComment}>등록</SubmitButton>
    </Wrapper>
  )
}

export default CommentForm
