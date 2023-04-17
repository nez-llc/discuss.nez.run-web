import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import { COLORS, useVoteData } from 'data/votes'
import Image from 'next/image'
import ExpandMore from 'assets/icons/expand_more.svg'

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
`

const Empty = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #FF7E7E, #DADADA, #0088FF);
  text-align: center;
  color: #000;
`

const Expandable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  font-size: 14px;
  color: #828282;
  gap: 5px;
`

const ShowDetailButton = styled.button`
  border: 0;
  padding: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: #828282;
  gap: 7px;
`

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  color: ${({ color }) => color};
  font-size: 14px;
  line-height: 17px;
`

const Bars = styled.div`
  display: flex;
  align-items: end;
  height: ${({ showDetail }) => showDetail ? '100px' : '30px'};
  margin-bottom: ${({ showDetail }) => showDetail ? '0' : '10px'};
`

const Bar = styled.div`
  width: ${({ detail, value }) => detail ? 20 : value}%;
  height: ${({ detail, value }) => detail ? value : 100}%;
  background: ${({ color }) => color};
  color: #fff;

  display: flex;
  align-items: end;
  justify-content: center;
  font-size: 10px;
  line-height: 100%;
  text-align: center;
`

const PrevVoteCount = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: rgba(12, 12, 12, 0.65);
`

const PrevBars = styled(Bars)`
  height: 24px;
`

const PrevBar = styled(Bar)`
`

const Value = styled.div`
  padding-bottom: 4px;
`

const VoteBar = ({
  votes: {
    strongly_agree, agree, neither, disagree, strongly_disagree, total,
  },
  expandable,
  isSticky,
}) => {
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if(expandable){
      setShowDetail(!isSticky)
    }
  }, [isSticky])

  if (total === 0 || total === undefined) {
    return <Empty>투표 없음</Empty>
  }

  if(expandable){
    return (
      <Wrapper>
        {isSticky ?
          <Expandable>
            <ShowDetailButton onClick={() => setShowDetail(!showDetail)}>
              <Image src={ExpandMore} alt="결과 보기" />
              <span>{showDetail ? '닫기' : '결과 보기'}</span>
            </ShowDetailButton>
            <span>({total}명 투표중)</span>
          </Expandable>
          :
          <Expandable>{total}명 투표중</Expandable>
        }
        <Labels>
          <Label color={COLORS.strongly_disagree}>반대 {((strongly_disagree + disagree) / total * 100).toFixed()}%</Label>
          <Label color={COLORS.strongly_agree}>찬성 {((strongly_agree + agree) / total * 100).toFixed()}%</Label>
        </Labels>

        <Bars>
          <Bar color={COLORS.strongly_disagree} value={strongly_disagree / total * 100} />
          <Bar color={COLORS.disagree} value={disagree / total * 100} />
          <Bar color={COLORS.neither} value={neither / total * 100} />
          <Bar color={COLORS.agree} value={agree / total * 100} />
          <Bar color={COLORS.strongly_agree} value={strongly_agree / total * 100} />
        </Bars>
        {(showDetail) && (
          <Bars showDetail={showDetail}>
            <Bar detail color={COLORS.strongly_disagree} value={strongly_disagree / total * 100}>
              <Value>{(strongly_disagree / total * 100).toFixed()}%</Value>
            </Bar>
            <Bar detail color={COLORS.disagree} value={disagree / total * 100}>
              <Value>{(disagree / total * 100).toFixed()}%</Value>
            </Bar>
            <Bar detail color={COLORS.neither} value={neither / total * 100}>
              <Value>{(neither / total * 100).toFixed()}%</Value>
            </Bar>
            <Bar detail color={COLORS.agree} value={agree / total * 100}>
              <Value>{(agree / total * 100).toFixed()}%</Value>
            </Bar>
            <Bar detail color={COLORS.strongly_agree} value={strongly_agree / total * 100}>
              <Value>{(strongly_agree / total * 100).toFixed()}%</Value>
            </Bar>
          </Bars>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <PrevVoteCount>{total}명 투표중</PrevVoteCount>
      <PrevBars>
        <PrevBar color={COLORS.strongly_disagree} value={(strongly_disagree + disagree) / total * 100} />
        <PrevBar color={COLORS.neither} value={neither / total * 100} />
        <PrevBar color={COLORS.strongly_agree} value={(strongly_agree + agree) / total * 100} />
      </PrevBars>
    </Wrapper>
  )
}

export default VoteBar
