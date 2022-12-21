import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Pagination from 'components/ui/Pagination'
import QuestionPreview from 'components/question/QuestionPreview'
import {useQuestions} from 'data/questions'

const Wrapper = styled.div`
  padding: 16px 0;
`

const OrderSelect = () => {
  return (
    <ul
      css={{
        padding: '8px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
      }}
    >
      <li>
        <button>추천</button>
      </li>
      <li>
        <button>최신</button>
      </li>
    </ul>
  )
}

const List = ({ questions }) => {

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: 24px;
        a {
          text-decoration: none;
        }
      `}
    >
      {questions.map(question => (
        <li key={question.id}>
          <Link href={`/agenda/${question.id}`}>
            <a>
              <QuestionPreview key={question.id} question={question} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const QuestionList = ({tag}) => {
    const { questions, total, per_page } = useQuestions(tag);

    return (
      <Wrapper>
        <a href="/agenda/new">새로운 질문 올리기</a>
        <hr />
        <OrderSelect />
        <List questions={questions}/>
        <Pagination total={total} per_page={per_page}/>
      </Wrapper>
    )
}

export default QuestionList
