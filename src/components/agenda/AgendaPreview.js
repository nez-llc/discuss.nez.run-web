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
  padding: 0 10px;
`

const Title = styled.h3`
  
`

const Stat = ({ question }) => {
  return (
    <div css={css`font-size: small; display: flex; dl {display: flex;} dd {margin-right: 16px;}`}>
      <dl><dd>{fromNow(question.created_time)}</dd></dl>
      <dl css={css`margin-left: auto;`}>
        <dt>추천</dt>
        <dd>{question.updown?.total}</dd>
        {/* <dt>투표</dt>
        <dd>{sum(Object.values(question.vote_count))}</dd> */}
        <dt>댓글</dt>
        <dd>{question.comment_count}</dd>
      </dl>
    </div>
  )
}

const ListView = ({ agenda }) => (
  <>
    <div css={css`display: flex; gap: 5px;`}>
      <div css={css`width:100%; display: flex; flex-direction: column; gap: 10px;`}>
        <h4>{agenda.title}</h4>
        <ul css={css`display: flex; gap: 3px; width:70%;`}>
          <li css={css`width: 80%;`}>

          </li>
          {/* <li css={css`width:20%; font-size: small; text-align: center;`}>{sum(Object.values(agenda.vote_count))}</li> */}
        </ul>
      </div>
    </div>
    <div css={css`width: 100%; display: flex; flex-direction: column; gap: 10px;`}>

    </div>
  </>
)

const AgendaPreview = ({ agenda }) => {
  const { votes } = useVoteData(agenda.id)

  return (
    <Wrapper>
      <Title>{agenda.title}</Title>
      <VoteBar votes={votes} />
      <Tags tags={agenda.tags} view={'list'} />
      <Stat question={agenda} />
    </Wrapper>
  )
}

export default AgendaPreview
