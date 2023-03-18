import { useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import ProfilePicture from 'components/ui/ProfilePicture'
import { useAuth } from 'auth/use-auth'
import { useApi } from 'utils/api'
import { fromNow } from 'utils/date'

const Wrapper = styled.div`
  
`

const Nickname = styled.h3`
`

const Created = styled.h4`
  
`

const Content = styled.div`
  
`

const Actions = styled.div`
  
`

const AgreementButton = styled.button`
  
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  max-width: 100%;
`

const Profile = styled.div`
  
`

const DeletedComment = () => (
  <div>삭제 된 댓글입니다.</div>
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
    <div>
      <Content>
        {comment.content}
      </Content>
      <Actions>
        {owned ? <>
          <Button onClick={startDelete}>삭제</Button>
          <Button onClick={startEdit}>수정</Button>
        </> : <>
          <span>{comment.agreement}</span>
          <AgreementButton onClick={agree}>공감</AgreementButton>
          <AgreementButton onClick={disagree}>비공감</AgreementButton>
        </>}
      </Actions>
    </div>
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
        <Nickname>{comment.writer?.nickname || comment.writer?.id}</Nickname>
        <Created>{fromNow(comment.created_time)}</Created>
      </Profile>
      <div>
        {editing
          ? <CommentEditor comment={comment} onEnd={endEdit} />
          : <CommentViewer comment={comment} startEdit={startEdit} refresh={refresh} />
        }
      </div>
    </Wrapper>
  )
}

export default Comment
