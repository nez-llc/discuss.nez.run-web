import React from 'react'
import VoteBar from 'components/vote/VoteBar'
import VoteButtons from 'components/vote/VoteButtons'
import styled from '@emotion/styled'

const Vote = ({ currentAgenda, refresh, my_updown, myAgendaRefresh }) => {
  return (
    <>
      <VoteBar voteCount={currentAgenda.vote_count} view={'detail'} />
      <VoteButtons
        currentAgenda={currentAgenda}
        refresh={refresh}
        my_updown={my_updown}
        myAgendaRefresh={myAgendaRefresh}
      />
    </>
  )
}

export default Vote