import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'

const Ul = styled.ul`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const CommentList = ({ comments, refresh }) => (
  <Ul>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} refresh={refresh} />
    ))}
  </Ul>
)

export default CommentList
