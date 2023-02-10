import styled from '@emotion/styled'


const Wrapper = styled.div`
  position: relative;
  align-items: center;
`


const Outer = styled.div`
  height: 30px;
  display: flex;
  width: 100%;
  line-height: 30px;
  font-size: small;
  color: #fff;
  > div {
    padding: 0px 5px;
  }
  > div:nth-child(3){
    text-align: right;
  }
  
`

const Inner = styled.div`
  height: 100%;
`

const VoteBar = ({ voteCount }) => {
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
    {'value': voteDisagreeCnt, 'color': '#F97C7C'},
    {'value': voteCount?.neutral, 'color': '#DADADA'},
    {'value': voteAgreeCnt, 'color': '#538CE2'}]

  if (votes.every(vote => vote === 0)) {
    votes.fill(1)
  }
  return (
    <Wrapper>
      <Outer>
        {voteTotCnt > 0 ?
          <>
            {votes.filter(vote => (vote.value > 0)).map((vote, index) => (
              <Inner key={vote.color} style={{
                width: `${vote.value/voteTotCnt * 100}%`,
                background: `${vote.color}`,
              }}>{index === 1 ? '' : `${vote.value/voteTotCnt * 100}%`}</Inner>
            ))}
          </>
          :
          <Inner style={{
            width: '100%',
            background: 'linear-gradient(90deg, #F97C7C, #DADADA, #538CE2)',
            'text-align': 'center',
            color: '#000',
          }}>투표 없음</Inner>
        }
      </Outer>
    </Wrapper>
  )
}

export default VoteBar
