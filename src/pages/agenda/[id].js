import React from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'
import Markdown from 'components/ui/Markdown'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/ui/VoteBar'
import CommentList from 'components/comment/CommentList'
import RelatedReferences from 'components/question/RelatedReferences'
import CommentForm from 'components/comment/CommentForm'

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const QuestionPage = ({ question }) => {
  return (
    <div>
      <Pane>
        <Title>{question.title}</Title>
        <Markdown>{question.summary}</Markdown>
        <hr />
        <Markdown>{question.desc}</Markdown>
        <Tags tags={question.tags} />
      </Pane>

      <Pane>
        <VoteBar votes={question.votes} />
      </Pane>

      <div
        css={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h3>123</h3>
        <button>추천</button>
      </div>

      <Pane>
        <Pane.Title>관련정책</Pane.Title>
        <RelatedReferences />
      </Pane>

      <Pane>
        <Pane.Title>의견</Pane.Title>
        <CommentList />
        <CommentForm />
      </Pane>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { id } = query

  const fetchQuestion = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/api/agendas/${id}`)
    return await response.json()
  }

  const question = await fetchQuestion()

  return {
    props: {
      question,
    }
  }
}

export default QuestionPage
