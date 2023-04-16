import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/vote/VoteBar'
import { fromNow } from 'utils/date'
import { useVoteData } from 'data/votes'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  border-radius: 8px;
  
  padding: 16px;
  
`

const Title = styled.h3`
  
`

const Stat = ({ question }) => (
  <div css={css`font-size: small; display: flex; dl {display: flex;} dd {margin-right: 16px;}`}>
    <dl><dd>{fromNow(question.created_time)}</dd></dl>
    <dl css={css`margin-left: auto;`}>
      <dt>추천</dt>
      <dd>{question.updown?.total}</dd>
      <dt>댓글</dt>
      <dd>{question.comment_count}</dd>
    </dl>
  </div>
)

const AgendaPreview = ({ agenda }) => {
  const { votes } = useVoteData(agenda.id)

  return (
    <Wrapper>
      <Title>{agenda.title}</Title>
      <Tags tags={agenda.tags} view={'list'} />
      <VoteBar votes={votes} />
      <Stat question={agenda} />
    </Wrapper>
  )
}

export default AgendaPreview
