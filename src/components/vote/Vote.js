import React from 'react'
import VoteBar from 'components/vote/VoteBar'
import VoteButtons from 'components/vote/VoteButtons'
import styled from '@emotion/styled'

const DetailVote = styled.div`
  background-color: #EFEFEF;
  border-radius: 10px;
  padding: 10px;
`

const Vote = ({ currentAgenda, refresh, token }) => {
  // const { vote, voteRefresh } = useAgendaVote(currentAgenda.id)
  // const { user } = useAuth()
  // console.log(user.id)
  return (
    <DetailVote>
      <VoteBar voteCount={currentAgenda.vote_count} view={'detail'} agendaId={currentAgenda.id}/>
      <VoteButtons
        voteCount={currentAgenda.vote_count}
        currentAgenda={currentAgenda}
        refresh={refresh}
        token={token}
      />
    </DetailVote>
  )
}

export default Vote