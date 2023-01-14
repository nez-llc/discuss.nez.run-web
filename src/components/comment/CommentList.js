import React from 'react'
import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'

const Ul = styled.ul`
`

const Li = styled.li`
  margin-bottom: 24px;
`

const CommentList = ({ agendaId, comments, onDeleted }) => (
  <Ul>
    {comments.map(comment => (
      <Li key={comment.id}>
        <Comment comment={comment} refresh={onDeleted} agendaId={agendaId}/>
      </Li>
    ))}
  </Ul>
)

export default CommentList
