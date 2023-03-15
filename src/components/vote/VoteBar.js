import styled from '@emotion/styled'
import React from 'react'


const Wrapper = styled.div`
  ${props => props.view === 'detail' ? 'align-items: center;' : 'display: flex;\nalign-items: self-end;'}
`

const Description = styled.div`
  padding: 5px 10px;
  line-height: 20px;
  display: flex;
  font-size: small;
  span:nth-of-type(1){
    width: 20%;
    color: #F97C7C;
  }
  span:nth-of-type(2){
    width: 60%;
    font-size: medium;
    text-align: center;
    font-weight: bold;
  }
  span:nth-of-type(3){
    width: 20%;
    text-align: right;
    color: #538CE2;
  }
`

const Outer = styled.div`
  ${props => props.view === 'detail' ? '' : 'overflow: hidden; border-radius: 5px;'};
  height: ${props => props.view === 'detail' ? '30px' : '16px'};
  line-height: ${props => props.view === 'detail' ? '30px' : '16px'};
  display: flex;
  width: 100%;
  font-size: small;
  color: #fff;
`

const Inner = styled.div`
  width: ${props => props.vote.proportion}%;
  height: 100%;
  
  ${props => props.vote.type === 'disagree' ?
    `
    background: #F97C7C; 
    text-align: left;
    `
    : props.vote.type === 'agree' ?
      `
      background: #538CE2; 
      text-align: right;
      `
      : `
        background: #DADADA;
        text-align: center;
        `}
  
  span {
    padding: 0 5px;
  }
`

const NoVote = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #F97C7C, #DADADA, #538CE2);
  text-align: center;
  color: #000;
`

const VoteBar = ({ voteCount, view }) => {
  let voteTotCnt = 0
  let voteAgreeCnt = 0
  let voteDisagreeCnt = 0

  for(const vote in voteCount) {
    let voteCnt = voteCount[vote]
    voteTotCnt += voteCnt
    switch (vote){
      case 'very_agree':
      case 'agree':
        voteAgreeCnt += voteCnt
        break
      case 'very_disagree':
      case 'disagree':
        voteDisagreeCnt += voteCnt
        break
    }
  }

  const votes = [
    {'type': 'disagree', 'proportion': voteDisagreeCnt/voteTotCnt * 100},
    {'type': 'neutral', 'proportion': voteCount.neutral/voteTotCnt * 100},
    {'type': 'agree', 'proportion': voteAgreeCnt/voteTotCnt * 100}]

  return (
    <Wrapper view={view}>
      {view === 'detail' ?
        <Description>
          <span>반대</span>
          <span>투표자 {voteTotCnt}명</span>
          <span>찬성</span>
        </Description>
        : <></>
      }
      <Outer view={view}>
        {voteTotCnt > 0 ?
          <>
            {votes.map((vote, index) => (
              <Inner key={vote.type} vote={vote}>
                {index !== 1 && view === 'detail' ?
                  <span>{vote.proportion}%</span>
                  : <></> }
              </Inner>
            ))}
          </>
          :
          <NoVote>투표 없음</NoVote>
        }
      </Outer>
    </Wrapper>
  )
}

export default VoteBar
