import { useComments } from 'data/comments'
import CommentForm from 'components/comment/CommentForm'
import CommentList from 'components/comment/CommentList'

const Comments = ({ agendaId }) => {
  const { comments, mutate } = useComments(agendaId)

  return (
    <>
      <CommentForm agendaId={agendaId} onCreated={mutate} />
      <CommentList comments={comments} refresh={mutate} />
    </>
  )
}

export default Comments
