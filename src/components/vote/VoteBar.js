import { useState } from 'react'
import styled from '@emotion/styled'
import { COLORS, useVoteData } from 'data/votes'

const Wrapper = styled.div`
  
`

const Empty = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #FF7E7E, #DADADA, #0088FF);
  text-align: center;
  color: #000;
`

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  color: ${({ color }) => color};
`

const Bars = styled.div`
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  height: ${({ showDetail }) => showDetail ? '100px' : '30px'};
`

const Bar = styled.div`
  width: ${({ detail, value }) => detail ? 20 : value}%;
  height: ${({ detail, value }) => detail ? value : 100}%;
  background: ${({ color }) => color};
  color: #fff;
  overflow: hidden;
`

const Value = styled.div`
  position: absolute;
  color: #fff;
  top: 0;
`

const VoteBar = ({
  votes: {
    strongly_agree, agree, neither, disagree, strongly_disagree, total,
  },
  expandable,
}) => {
  const [showDetail, setShowDetail] = useState(false)

  if (total === 0) {
    return <Empty>투표 없음</Empty>
  }
  return (
    <Wrapper>
      {expandable && (
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? '닫기' : '자세히보기'}
        </button>
      )}
      <Bars showDetail={showDetail}>
        <Value style={{ left: 0 }}>
          {((strongly_disagree + disagree) / total * 100).toFixed()}%
        </Value>
        <Value style={{ right: 0 }}>
          {((strongly_agree + agree) / total * 100).toFixed()}%
        </Value>
        <Bar detail={showDetail} color={COLORS.strongly_disagree} value={strongly_disagree / total * 100} />
        <Bar detail={showDetail} color={COLORS.disagree} value={disagree / total * 100} />
        <Bar detail={showDetail} color={COLORS.neither} value={neither / total * 100} />
        <Bar detail={showDetail} color={COLORS.agree} value={agree / total * 100} />
        <Bar detail={showDetail} color={COLORS.strongly_agree} value={strongly_agree / total * 100} />
      </Bars>
      <Labels>
        <Label color={COLORS.strongly_disagree}>반대</Label>
        <Label color={COLORS.strongly_agree}>찬성</Label>
      </Labels>
    </Wrapper>
  )
}

export default VoteBar
