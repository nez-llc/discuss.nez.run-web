import { useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import ProfilePicture from 'components/ui/ProfilePicture'
import { useAuth } from 'auth/client'
import { useApi } from 'utils/api'
import { fromNow } from 'utils/date'
import UpButton from 'assets/up_button.svg?inline'
import DownButton from 'assets/down_button.svg?inline'
import CommentImg from 'assets/comment.svg'

import Image from 'next/image'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 20px;
  gap: 16px;

  background: #FFFFFF;
  border: 1px solid #828282;
  border-radius: 12px;

`

const Nickname = styled.h3`
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;

  color: #09101D;
`

const Created = styled.h4`
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;

  color: #09101D;
`

const Content = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;

  display: flex;
  align-items: center;

  color: #394452;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
`

const ReComment = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 5px;
  font-weight: 400;
  font-size: 12px;
  color: #828282;
  line-height: inherit;

  border: 0;
  background-color: transparent;
`

const AgreementButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 400;
  font-size: 12px;
  color: #828282;
  line-height: inherit;

  border: 0;
  background-color: transparent;
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  max-width: 100%;
`

const Profile = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;
  border-bottom: 1px solid #828282;
`

const ProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const DeletedComment = () => (
  <Wrapper>
    <Content>
      삭제 된 댓글입니다.
    </Content>
  </Wrapper>
)

const CommentEditor = ({ comment, onEnd }) => {
  const { client } = useApi()
  const [content, setContent] = useState(comment.content)

  const cancel = () => onEnd()

  const save = async () => {
    const result = await client.put(`/api/agendas/${comment.agenda_id}/comments/${comment.id}`, {
      content,
    })
    onEnd()
  }

  return (
    <div>
      <Textarea value={content} onChange={e => setContent(e.target.value)} />
      <Actions>
        <Button onClick={save}>
          저장
        </Button>
        <Button onClick={cancel}>
          수정 취소
        </Button>
      </Actions>
    </div>
  )
}

const CommentViewer = ({ comment, startEdit, refresh }) => {
  const { user } = useAuth()
  const { client } = useApi()

  const startDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await client.delete(`/api/agendas/${comment.agenda_id}/comments/${comment.id}`)
    refresh()
    // TODO : 삭제됨 안내
  }

  const agreement = async ballot => {
    const { code } = await client.post(`/api/agendas/${comment.agenda_id}/comments/${comment.id}/agreement`, {
      ballot,
    })

    const onUnauthorized = () => {
      // TODO : 조금 더 예쁜 alert 띄우기
      alert('로그인이 필요합니다.')
    }

    switch (code) {
      case 201: refresh(); break
      case 401: onUnauthorized(); break
        break
      // case 500:
      // default:
      //   onServerError(data)
      //   break
    }
  }
  const agree = () => agreement('agree')
  const disagree = () => agreement('disagree')

  const owned = user.id === comment.writer.id

  return (
    <>
      <Content>
        {comment.content}
      </Content>
      <Actions>
        {owned ? <>
          <Button onClick={startDelete}>삭제</Button>
          <Button onClick={startEdit}>수정</Button>
        </> : <>
          <AgreementButton onClick={agree}>
            <UpButton />
            <span>{comment.agreement}</span>
          </AgreementButton>
          <AgreementButton onClick={disagree}>
            <DownButton />
          </AgreementButton>
          <ReComment>
            <Image src={CommentImg} alt="대댓글" />
            <span>0</span>
          </ReComment>
        </>}
      </Actions>

    </>
  )
}

const Comment = ({ comment, refresh }) => {
  const [editing, setEditing] = useState(false)

  const startEdit = () => setEditing(true)
  const endEdit = () => {
    setEditing(false)
    refresh()
  }

  if (comment.deleted) return <DeletedComment comment={comment} />

  return (
    <Wrapper>
      <Profile>
        <ProfilePicture url={comment.writer.picture} />
        <ProfileUser>
          <Nickname>{comment.writer?.nickname || comment.writer?.id}</Nickname>
          <Created>{fromNow(comment.created_time)}</Created>
        </ProfileUser>
      </Profile>
      <>
        {editing
          ? <CommentEditor comment={comment} onEnd={endEdit} />
          : <CommentViewer comment={comment} startEdit={startEdit} refresh={refresh} />
        }
      </>
    </Wrapper>
  )
}

export default Comment
