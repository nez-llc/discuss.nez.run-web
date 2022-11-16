import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'

const Ul = styled.ul`
`

const Li = styled.li`
  margin-bottom: 24px;
`

const useComments = agendaId => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = () => {

    }
    fetchComments()
  }, [agendaId])

  return comments
}

const CommentList = ({ agendaId }) => {
  const comments = useComments(agendaId)

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
