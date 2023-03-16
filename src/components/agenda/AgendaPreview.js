import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import VoteBar from 'components/vote/VoteBar'
import {detailDate} from 'utils/dayjs'
import Tags from 'components/ui/Tags'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0px 10px;
  /*border-bottom: 1px solid #bdbdbd;*/
`
const Recommended = styled.h2`
`

const Info = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }
`

const sum = arr => arr.reduce((a, b) => a + b, 0)


const Stat = ({ question }) => {
  return (
    <div css={css`font-size: small; display: flex; dl {display: flex;} dd {margin-right: 16px;}`}>
      <dl><dd>{detailDate(question.created_time)}</dd></dl>
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
            <VoteBar voteCount={agenda.vote_count} />
          </li>
          <li css={css`width:20%; font-size: small; text-align: center;`}>{sum(Object.values(agenda.vote_count))}</li>
        </ul>
      </div>
    </div>
    <div css={css`width: 100%; display: flex; flex-direction: column; gap: 10px;`}>
      <Tags tags={agenda.tags} view={'list'} />
      <Stat question={agenda} />
    </div>
  </>
)
const AgendaPreview = ({ agenda }) => {
  return (
    <Wrapper>
      <ListView agenda={agenda}/>
      <hr css={css`width: 100%;
                border: 0;
                border-top: 1px solid #C4C4C4;
                margin: 0;`}/>
    </Wrapper>
  )
}

export default AgendaPreview
