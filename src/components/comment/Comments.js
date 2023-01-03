import {useComments} from 'data/comments'
import CommentList from 'components/comment/CommentList'
import CommentForm from 'components/comment/CommentForm'

const Comments = ({ agendaId }) => {
  const { comments, mutate } = useComments(agendaId)


  return (
    <>
      <CommentList agendaId={agendaId} comments={comments} onDeleted={mutate} />
      <CommentForm agendaId={agendaId} onCreated={mutate} />
    </>
  )
}

export default Comments
