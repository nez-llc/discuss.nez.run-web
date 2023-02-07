import styled from '@emotion/styled'


const Wrapper = styled.div`
  position: relative;
  align-items: center;
`

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
  const votes = [
    {'value' : voteCount?.not_agree, 'color' : '#F97C7C'},
    {'value' : voteCount?.not_sure, 'color' : '#DADADA'},
    {'value' : voteCount?.agree, 'color' : '#538CE2'}]

  let votesTotalCnt = 0
  for (let key in voteCount) {
    votesTotalCnt += voteCount[key]
  }

  if (votes.every(vote => vote === 0)) {
    votes.fill(1)
  }

  return (
    <Wrapper>
      <Description>
        <span>반대</span>
        <span>투표자 {votesTotalCnt}명</span>
        <span>찬성</span>
      </Description>
      <Outer>
        {votes.map((vote, index) => (
          <Inner key={vote.color}
            style={{
              width: `${vote.value / 0.3 * 100}%`,
              background: `${vote.color}`,
            }}
          >{index === 1 ? '' : `${vote.value/votesTotalCnt * 100}%`}</Inner>
        ))}
      </Outer>
    </Wrapper>
  )
}

export default VoteBar
