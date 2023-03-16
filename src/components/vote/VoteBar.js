import styled from '@emotion/styled'
import React from 'react'


const Wrapper = styled.div`
  ${props => props.view === 'detail' ? 'align-items: center;' : 'display: flex;\nalign-items: self-end;'};
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
    width: 20%;
    color: #538CE2;
    margin-left: auto;
    text-align: right;
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
  border-radius: 5px;
  overflow: hidden;
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
  let voteTotCnt = Object.values(voteCount).reduce((acc, curr) => acc + curr, 0)

  const votes = [
    {'type': 'disagree', 'proportion': (voteCount.very_disagree + voteCount.disagree)/voteTotCnt * 100},
    {'type': 'neutral', 'proportion': voteCount.neutral/voteTotCnt * 100},
    {'type': 'agree', 'proportion': (voteCount.very_agree + voteCount.agree)/voteTotCnt * 100}]

  return (
    <Wrapper view={view}>
      {view === 'detail' ?
        <Description>
          <span>반대</span>
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
