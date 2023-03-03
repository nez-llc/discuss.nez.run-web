import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Tags from 'components/ui/Tags'
import Markdown from 'components/ui/Markdown'
//import VoteBar from 'components/ui/VoteBar'
import VoteBar from 'components/vote/Votebar'
import {detailDate} from 'utils/dayjs'


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
    <div css={css`font-size: small; dl {display: flex;} dd {margin-right: 16px;}`}>
      <dl>
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

const ListView = ({ question }) => (
  <>
    <div css={css`display: flex;`}>
      <div css={css`width: 160px; height: 160px;`}>
        <img css={css`width: 100%; height: 100%; object-fit: cover;
        `} src={'https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg'}/>
      </div>
      <div css={css`width:70%; display: flex; flex-direction: column; gap: 10px;`}>
        <div css={css`width: 100%; padding: 0px 10px; height: 134px;`}>
          <h4 css={css`height: 80px; display: flex; align-items: self-end;`}>{question.title}</h4>
          <div css={css`padding-top: 10px;`}>
            {/* <Tags tags={question.tags}></Tags> */}
            <ul css={css`display: flex; gap: 5px;`}>
              {question.tags?.slice(0, 3).map(tag => (
                <li key={tag.id} css={css`color: #FF6861; border: 1px solid #FF6861; padding: 3px 5px; border-radius: 20px; font-size: x-small;`}>{tag.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <VoteBar voteCount={question.vote_count} />
      </div>
    </div>
  </>
)

const ListView2 = ({ question }) => (
  <>
    <div css={css`display: flex; gap: 5px;`}>
      <div css={css`width:70%; display: flex; flex-direction: column;`}>
        <h4 css={css`height: 70px`}>{question.title}</h4>
        {/* <Tags tags={question.tags}></Tags> */}
        <ul css={css`display: flex; gap: 5px;`}>
          {question.tags?.slice(0, 3).map(tag => (
            <li key={tag.id} css={css`color: #FF6861; border: 1px solid #FF6861; padding: 3px 5px; border-radius: 20px; font-size: x-small;`}>{tag.name}</li>
          ))}
        </ul>
      </div>
      <div css={css`width:30%;`}>
        <img css={css`height: 100px; object-fit: cover;`}
          src={'https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg'}/>
      </div>
    </div>
    <div css={css`width: 100%; display: flex; flex-direction: column; gap: 10px;`}>
      {/* <Stat question={question} /> */}
      <div css={css`font-size: small; dl {display: flex;} dd {margin-right: 16px;}`}>
        <dl>
          <dt>추천</dt>
          <dd>{question.updown?.total}</dd>
          <dt>투표</dt>
          <dd>{sum(Object.values(question.vote_count))}</dd>
          <dt>댓글</dt>
          <dd>{question.comment_count}</dd>
          <dt css={css`margin-left: auto;`}>{detailDate(question.created_time)}</dt>
        </dl>
      </div>
      <VoteBar voteCount={question.vote_count} />
    </div>
  </>
)

const ListView3 = ({ question }) => (
  <>
    <div css={css`display: flex; gap: 5px;`}>
      <div css={css`width:70%; display: flex; flex-direction: column; gap: 10px;`}>
        <h4 css={css`height: 70px`}>{question.title}</h4>
        <ul css={css`display: flex; gap: 3px;`}>
          <li css={css`width:20%; font-size: 11px; text-align: center;`}>{detailDate(question.created_time)}</li>
          <li css={css`width: 60%;`}>
            <VoteBar voteCount={question.vote_count} />
          </li>
          <li css={css`width:20%; font-size: small; text-align: center;`}>{sum(Object.values(question.vote_count))}</li>
        </ul>
      </div>
      <div css={css`width:30%;`}>
        <img css={css`height: 100px; object-fit: cover;`}
          src={'https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg'}/>
      </div>
    </div>
    <div css={css`width: 100%; display: flex; flex-direction: column; gap: 10px;`}>
      {/* <Tags tags={question.tags}></Tags> */}
      <ul css={css`display: flex; gap: 5px;`}>
        {question.tags?.slice(0, 3).map(tag => (
          <li key={tag.id} css={css`font-size: small; text-decoration: underline; color: #828282;`}>{tag.name}</li>
        ))}
      </ul>
      <Stat question={question} />
    </div>
  </>
)
const QuestionPreview = ({ question, view }) => (
  <Wrapper>
    {view === 'L01' ?
      <ListView question={question} />
      : view === 'L02' ?
        <>
          <ListView2 question={question} />
          <hr css={css`width:100%; border: 0; border-top: 1px solid #C4C4C4; margin: 0;`} />
        </>
        : <>
          <ListView3 question={question} />
          <hr css={css`width:100%; border: 0; border-top: 1px solid #C4C4C4; margin: 0;`} />
        </>
    }
  </Wrapper>
)

export default QuestionPreview
