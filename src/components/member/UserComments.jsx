import { useEffect, useState } from 'react'
import Comment from 'components/comment/Comment'
import { useApi } from 'utils/api'

const useUserComments = userId => {
  const { client } = useApi()
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!userId) return

    const fetchComments = async () => {
      const { data } = await client.get(`/api/members/${userId}/comments`)
      setComments(data)
    }
    fetchComments()
  }, [client, userId])

  return {
    comments,
  }
}

const UserComments = ({ userId }) => {
  const { comments } = useUserComments(userId)

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  )
}

export default UserComments
