import React from 'react'
import VoteBar from 'components/vote/VoteBar'
import VoteButtons from 'components/vote/VoteButtons'
import {useAgendaVote} from '../../pages/agenda/agenda'
import {useAuth} from '../../auth/use-auth'

const Vote = ({ currentAgenda, refresh, token }) => {
  // const { vote, voteRefresh } = useAgendaVote(currentAgenda.id)
  // const { user } = useAuth()
  // console.log(user.id)
  return (
    <>
      <VoteBar voteCount={currentAgenda.vote_count} view={'detail'} agendaId={currentAgenda.id}/>
      <VoteButtons
        currentAgenda={currentAgenda}
        refresh={refresh}
        token={token}
      />
    </>
  )
}

export default Vote