import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Pagination from 'components/ui/Pagination'
import QuestionPreview from 'components/question/QuestionPreview'
import { useQuestions } from 'data/questions'
import Router, { useRouter } from 'next/router'
import MainQuestionPreview from './MainQuestionPreview'

const Wrapper = styled.div`
  padding: 16px 0;
`
const MainUl = styled.ul`
  display: grid;
  flex-direction: column;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
  a {
    text-decoration: none;
  }
`
const MainLi = styled.li`
  flex-grow: 1;
  margin: 20px 0;
`
const MainWrapper = styled.div`
  margin: 50px 100px;
`
const Text = styled.p`
  margin: 0 0 5px 65px;
`

const OrderSelect = ({sort}) => {
  const router = useRouter()
  const doSort = (sort) => {
    Router.push({
      pathname: router.pathname,
      query: { ...router.query, sort },
    })
  }
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
        <button onClick={() => doSort('recommend')} style={(sort === 'recommend') ? {fontWeight: 'bold'} : {}}>추천</button>
      </li>
      <li>
        <button onClick={() => doSort('latest')} style={(sort !== 'recommend') ? {fontWeight: 'bold'} : {}}>최신</button>
      </li>
    </ul>
  )
}

const List = ({ questions }) => (
  <ul
    css={css`
        display: flex;
        flex-direction: column;
        gap: 15px;
        a {
          text-decoration: none;
        }
      `}
  >
    {questions.map(question => (
      <li key={question.id}>
        <Link href={`/agenda/${question.id}`}>
          <QuestionPreview key={question.id} question={question} />
        </Link>
      </li>
    ))}
  </ul>
)


const MainList = ({ questions }) =>
  // questions = questions.slice(0, 6)
  (
    <MainUl>
      {questions.slice(0, 6).map((question, index) => (
        <MainLi key={question.id}>
          <Link href={`/agenda/${question.id}`}>
            <MainQuestionPreview key={question.id} index={index + 1} question={question} />
          </Link>
        </MainLi>
      ))}
    </MainUl>
  )

const QuestionList = ({tag, keyword, sort, searchType, view}) => {
  const { questions, total, per_page } = useQuestions(tag, keyword, sort, searchType)

  return (
    <Wrapper>
      {
        view === 'main' ?
          <MainWrapper>
            <Text>지금 이야기해야 하는 디지털 이슈</Text>
            <MainList questions={questions}/>
          </MainWrapper>
          :
          <>
            <a href="/agenda/new">새로운 질문 올리기</a>
            <hr />
            <OrderSelect sort={sort} />
            <List questions={questions}/>
            <Pagination total={total} per_page={per_page}/>
          </>
      }
    </Wrapper>
  )
}

export default QuestionList
