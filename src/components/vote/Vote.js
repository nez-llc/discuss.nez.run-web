import React from 'react'
import VoteBar from 'components/vote/VoteBar'
import VoteButtons from 'components/vote/VoteButtons'
import styled from '@emotion/styled'

const Description = styled.div`
  padding: 5px 10px;
  line-height: 20px;
  span{
    display: inline-block;
    font-size: small;
  }
  span:nth-child(1){
    width: 20%;
    color: #F97C7C;
  }
  span:nth-child(2){
    width: 60%;
    font-size: medium;
    text-align: center;
    font-weight: bold;
  }
  span:nth-child(3){
    width: 20%;
    text-align: right;
    color: #538CE2;
  }
`

const Vote = ({ currentAgenda, refresh, my_updown, myAgendaRefresh }) => {
  let voteTotCnt = 0
  for(const vote in currentAgenda.vote_count) {
    voteTotCnt += currentAgenda.vote_count[vote]
  }
  return (
    <>
      <Description>
        <span>반대</span>
        <span>투표자 {voteTotCnt}명</span>
        <span>찬성</span>
      </Description>
      <VoteBar voteCount={currentAgenda.vote_count} />
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