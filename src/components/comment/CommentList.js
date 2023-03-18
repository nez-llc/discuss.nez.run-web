import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'

const Ul = styled.ul`
`

const CommentList = ({ comments, refresh }) => (
  <Ul>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} refresh={refresh} />
    ))}
  </Ul>
)

export default CommentList
