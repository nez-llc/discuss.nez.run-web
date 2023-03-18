import { useEffect, useState } from 'react'
import { useApi } from 'utils/api'
import { VOTE_LABELS } from 'data/votes'

const useUserVotes = userId => {
  const { client } = useApi()
  const [votes, setVotes] = useState([])

  useEffect(() => {
    if (!userId) return

    const fetchVotes = async () => {
      const { data } = await client.get(`/api/members/${userId}/votes`)
      setVotes(data)
    }
    fetchVotes()
  }, [client, userId])

  return {
    votes,
  }
}


const UserVoteItem = ({ vote }) => (
  <div>
    <strong>&quot;{vote.agenda.title}&quot;</strong> 주제에 대해 <strong>{VOTE_LABELS[vote.vote]}</strong> 투표
  </div>
)

const UserVotes = ({ userId }) => {
  const { votes } = useUserVotes(userId)
  return (
    <ul>
      {votes.map(vote => (
        <li key={vote.id}>
          <UserVoteItem vote={vote} />
        </li>
      ))}
    </ul>
  )
}

export default UserVotes
