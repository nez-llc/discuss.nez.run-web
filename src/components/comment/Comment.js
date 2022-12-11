import React, {useState} from 'react'
import styled from '@emotion/styled'
import ProfilePicture from 'components/ui/ProfilePicture'
import {useApi} from "../../utils/api";
import {useAuth} from "../../auth/use-auth";
import * as PropTypes from "prop-types";

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
};
const Comment = ({ agendaId, comment, refresh }) => {
    const { client } = useApi()
    const { user } = useAuth()

    const [isEdit, setIsEdit] = useState(false)
    const [content, setContent] = useState('')

    const onUnauthorized = () => {
        alert('로그인이 필요합니다.');
    }
    const onForbidden = () => {
        alert('자신의 덧글만 지울 수 있습니다.');
    }

    const onEdited = () => {
      setIsEdit(false)
      refresh();
    };

    const deleteComment = async (agendaId, commentId) => {
        const { code, data } = await client.delete(`/api/agendas/${agendaId}/comments/${commentId}`)

        switch (code) {
            case 201: refresh(); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            case 403: onForbidden();
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
            case 403: onForbidden();
            break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }
    }

    const argeeComment = async (agendaId, commentId) => {
        const { code, data } = await client.post(`/api/agendas/${agendaId}/comments/${commentId}/agreement`)

        switch (code) {
            case 201: refresh(); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            case 403: onForbidden();
                break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }
    }

    return (
        <Wrapper>
            <ProfilePicture
                url={comment.writer.picture}
            />
            <div>
                <Name>{comment.writer.nickname}</Name>
                {
                    isEdit ?
                        <Textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        :
                        <>
                            <p>{comment.content}</p>
                            <p>공감 {comment.agreement}</p>
                        </>
                }
            </div>
            {
                (user.id === comment.writer.id) ?
                    (
                        <>
                            {
                                isEdit ?
                                    <>
                                        <EditBtn onClick={() => {editComment(content, agendaId, comment.id)}}>수정</EditBtn>
                                        <StartEditBtn onClick={toggleEdit}>수정 취소</StartEditBtn>
                                    </>
                                    :
                                    <StartEditBtn onClick={toggleEdit}>수정</StartEditBtn>
                            }
                            <DeleteBtn onClick={() => {deleteComment(agendaId, comment.id)}}>삭제</DeleteBtn>
                        </>
                    )
                    :
                    <AgreeBtn onClick={() => {argeeComment(agendaId, comment.id)}}>공감</AgreeBtn>
            }
        </Wrapper>
    )
}

export default Comment
