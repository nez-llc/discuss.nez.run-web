import React, {useState} from 'react'
import styled from '@emotion/styled'
import ProfilePicture from 'components/ui/ProfilePicture'
import {useApi} from 'utils/api'
import {useAuth} from 'auth/use-auth'
import * as PropTypes from 'prop-types'

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

const DeleteBtn = styled.button`
  
`
const StartEditBtn = styled.button`
  
`
const EditBtn = styled.button`
  
`
const AgreeBtn = styled.button`
  
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  max-width: 100%;
`

Textarea.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}

const CommentItem = styled.ul`
  width: 100%;
  padding: 5px 20px;
  font-size: 15px;
  border-bottom: 1px solid #F5F5F5;
  > div {
    height: 32px;
    line-height: 32px;
  }
  > div:nth-child(3){
    font-size: 12px;
    color: #8c8c8c;
  }
  > div:nth-child(3) span {
    margin-right: 10px;
  }
`

const Profile = styled.div`
  color: #8C8C8C;
  > div:first-child{
    display: inline-block;
    float: left;
    margin-right: 10px;
  }
`

const ProfileBtn = styled.div`
  display: inline-block;
  float: right;
  button {
    border: 0;
    font-size: 12px;
    height: 20px;
    margin-left: 10px;
    background-color: #fff;
  }
`
const Comment = ({ agendaId, comment, refresh }) => {
  const { client } = useApi()
  const { user } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [content, setContent] = useState('')

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }
  const onForbidden = () => {
    alert('자신의 덧글만 지울 수 있습니다.')
  }

  const onEdited = () => {
    setIsEdit(false)
    refresh()
  }

  const deleteComment = async (agendaId, commentId) => {
    const { code, data } = await client.delete(`/api/agendas/${agendaId}/comments/${commentId}`)

    switch (code) {
      case 201: refresh(); break
        // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
        break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
    }
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit)
    console.log(isEdit)
  }

  const editComment = async (content, agendaId, commentId) => {
    const { code, data } = await client.put(`/api/agendas/${agendaId}/comments/${commentId}`, {
      content
    })

    switch (code) {
      case 201: onEdited(); break
        // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
        break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
    }
  }

  const agreeComment = async (agendaId, commentId, ballot) => {
    const { code, data } = await client.post(`/api/agendas/${agendaId}/comments/${commentId}/agreement`, { ballot })

    switch (code) {
      case 201: refresh(); break
        // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
        break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
    }
  }

  return (
    <Wrapper>
      <CommentItem>
        {(comment.status === '1') ? <div>삭제 된 댓글입니다.</div>
          :
          <>
            <Profile>
              <ProfilePicture url={comment.writer.picture}/>
              <span>{comment.writer?.nickname ? comment.writer.nickname : '닉네임 없음'}</span>
              {(user.id === comment.writer.id) ?
                <ProfileBtn>
                  {
                    isEdit ?
                      <>
                        <EditBtn onClick={() => {editComment(content, agendaId, comment.id)}}>저장</EditBtn>
                        <StartEditBtn onClick={toggleEdit}>수정 취소</StartEditBtn>
                      </>
                      :
                      <StartEditBtn onClick={toggleEdit}>수정</StartEditBtn>
                  }
                  <DeleteBtn onClick={() => {deleteComment(agendaId, comment.id)}}>삭제</DeleteBtn>
                </ProfileBtn>
                : ''
              }
            </Profile>
            <div>
              {isEdit ?
                <Textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                : comment.content
              }</div>
            <div>
              <span>{comment.created_time }</span>
              <span onClick={() => {agreeComment(agendaId, comment.id, 'agree')}}>공감 {comment.agreement.agree}</span>
              <span onClick={() => {agreeComment(agendaId, comment.id, 'disagree')}}>비공감 {comment.agreement.disagree}</span>
              <span>대댓글</span>
            </div>
          </>
        }
      </CommentItem>
    </Wrapper>
  )
}

export default Comment
