import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Pane from 'components/layout/Pane'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/ui/VoteBar'
import VoteButtons from 'components/ui/VoteButtons'
import Markdown from 'components/ui/Markdown'

const Recommended = styled.h2`
`

const Info = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }
`

const sum = arr => arr.reduce((a, b) => a + b, 0)

const Stat = ({ question }) => (
  <div
    css={css`
      dl {
        display: flex;
      }
      dd {
        margin-right: 16px;
      }
    `}
  >
    <dl>
      <dt>추천</dt>
      <dd>{question.updown.total}</dd>
      <dt>투표</dt>
      <dd>{sum(Object.values(question.vote_count))}</dd>
      <dt>댓글</dt>
      <dd>123</dd>
    </dl>
  </div>
)

// const Wrapper = styled.div`
//   border-radius: 8px;
//   border: 1px solid #eeeeee;
//   box-shadow: 0 1px 10px rgba(0,0,0,0.2);
//   padding: 32px;
//   //display: flex;
//   //align-items: flex-start;
//   gap: 8px;
//
//   p {
//     text-decoration: none;
//   }
// `

const Wrapper = styled(Pane)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const QuestionPreview = ({ question }) => (
  <Wrapper>
    {/* <div>*/}
    {/*  <Recommended>{question.recommended}</Recommended>*/}
    {/* </div>*/}
    <Info>
      <h3>{question.title}</h3>
      <Markdown>{question.desc}</Markdown>
    </Info>
    <Tags tags={question.tags} />
    <VoteBar votes={question.votes} />
    <Stat question={question} />
  </Wrapper>
)

export default QuestionPreview
