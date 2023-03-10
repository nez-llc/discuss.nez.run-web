import React, { useState } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Pagination from 'components/ui/Pagination'
import QuestionPreview from 'components/question/QuestionPreview'
import { useQuestions } from 'data/questions'
import Router, { useRouter } from 'next/router'
import MainQuestionPreview from './MainQuestionPreview'
import Tags from '../ui/Tags'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import SwiperCore, { Navigation } from 'swiper'

const Wrapper = styled.div`
  padding: 16px 0;
  font-family: 'Source Sans Pro';
  font-style: normal;
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

const SetViewButtons = styled.div`
  display: flex;
  gap: 5px;
  button{
    flex-direction: column;
  }
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

const List = ({ questions, view }) => (
  <ul
    css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        a {
          text-decoration: none;
        }
      `}
  >
    {questions.map(question => (
      <li key={question.id}>
        <Link href={`/agenda/${question.id}`}>
          <QuestionPreview key={question.id} question={question} view={view} />
        </Link>
      </li>
    ))}
  </ul>
)

const SwiperList = ({ questions, view }) => {
  SwiperCore.use([Navigation])
  return (
    <Swiper>
      {questions.map((question) => (
        <SwiperSlide key={question.id}> {/* key 중복 error 발생으로 임시로 key 추가 */}
          <Link href={`/agenda/${question.id}`} css={css`text-decoration: none;`}>
            <QuestionPreview key={question.id} question={question} view={view}/>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const MainList = ({ questions }) =>
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
  const [ viewState, setViewState ] = useState('S01')

  const changeView = (state) => {
    setViewState(state)
  }

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
            <SetViewButtons>
              <button onClick={() => changeView('S01')}>배너1</button>
              <button onClick={() => changeView('S02')}>배너2</button>
              <button onClick={() => changeView('L01')}>리스트1</button>
              <button onClick={() => changeView('L02')}>리스트2</button>
              <button onClick={() => changeView('L03')}>리스트3</button>
            </SetViewButtons>
            <OrderSelect sort={sort} />
            {viewState === 'S01' || viewState === 'S02'
              ? <>
                <SwiperList questions={questions} view={viewState} />
              </>
              : <>
                <List questions={questions} view={viewState}/>
                <Pagination total={total} per_page={per_page}/>
              </>
            }
          </>
      }
    </Wrapper>
  )
}

export default QuestionList
