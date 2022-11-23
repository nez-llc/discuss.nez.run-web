import React from 'react'
import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'
import {useComments} from "../../data/comments";

const Ul = styled.ul`
`

const Li = styled.li`
  margin-bottom: 24px;
`
const CommentList = ({ agendaId }) => {
  const { comments } = useComments(agendaId)
  console.log(comments);

  return (
    <Ul>
      {comments.map(comment => (
        <Li key={comment.id}>
          <Comment comment={comment} />
        </Li>
      ))}
    </Ul>
  )
}


export default CommentList
