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
import VoteBar from 'components/vote/VoteBar'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'
import SwiperCore, { Navigation } from 'swiper'
import { detailDate } from 'utils/dayjs'

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

const SwiperList = ({ questions }) => {
  SwiperCore.use([Navigation])
  return (
    <Swiper>
      {questions.map((question) => (
        <SwiperSlide key={question.id}> {/* key 중복 error 발생으로 임시로 key 추가 */}
          <Link key={question.id} href={`/agenda/${question.id}`} css={css`text-decoration: none;`}>
            <div css={css`background-color: #bdbdbd; background-image: url("https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg"); background-repeat: none; background-size: cover;`}>
              <div
                css={css`
                  height: 250px;
                  background-position: 50% 50%;
                  background-size: contain;
                  background-repeat: no-repeat;
                  flex: none;
                  padding: 20px 5px;
                  display: grid;
                  gap: 15px;
                `}>
                <div css={css`padding: 0px 20px; display:flex`}>
                  <p css={css`margin-left: auto; color: #fff`}>투표하러 가기</p>
                </div>
                <h2 css={css`color: #fff; min-height: 80px; display: flex; align-items: self-end;`}>{question.title}</h2>
                <VoteBar voteCount={question.vote_count} />
                {/* <Tags tags={question.tags} /> */}
                <ul css={css`display: flex; gap: 5px; height: 25px;`}>
                  {question.tags?.slice(0, 3).map(tag => (
                    <li key={tag.id} css={css`font-size: small; color: #fff; border: 1px solid #fff; padding: 3px 5px; border-radius: 20px;`}>{tag.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div css={css`font-size: small; dl {display: flex;} dd {margin-right: 16px;} line-height: 50px; padding: 0px 10px;`}>
              <dl>
                <dt>추천</dt>
                <dd>{question.updown?.total}</dd>
                <dt>투표</dt>
                <dd>0</dd>
                <dt>댓글</dt>
                <dd>{question.comment_count}</dd>
                <dt css={css`margin-left: auto;`}>{detailDate(question.created_time)}</dt>
              </dl>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const SwiperList2 = ({ questions }) => {
  SwiperCore.use([Navigation])
  return (
    <Swiper>
      {questions.map((question) => {
        return (
          <SwiperSlide key={question.id}> {/* key 중복 error 발생으로 임시로 key 추가 */}
            <Link key={question.id} href={`/agenda/${question.id}`} css={css`text-decoration: none;`}>
              <div css={css`background-color: #bdbdbd; background-image: url("https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg"); background-repeat: none; background-size: cover;`}>
                <div
                  css={css`
                  height: 300px;
                  background-position: 50% 50%;
                  background-size: contain;
                  background-repeat: no-repeat;
                  flex: none;
                  padding: 20px 5px;
                  display: grid;
                  gap: 15px;
              `}>
                  <div css={css`padding: 0px 20px; display:flex`}>
                    <ul css={css`display: flex; gap: 5px; height: 25px;`}>
                      {question.tags?.slice(0, 3).map(tag => (
                        <li key={tag.id} css={css`font-size: small; color: #fff; border: 1px solid #fff; padding: 3px 5px; border-radius: 20px;`}>{tag.name}</li>
                      ))}
                    </ul>
                    <dl css={css`margin-left: auto; color: #fff; display: flex; font-weight: 700;`}>
                      <dt>추천</dt>
                      <dd>{question.updown?.total}</dd>
                    </dl>
                  </div>
                  <h2 css={css`color: #fff; padding: 0px 20px; min-height: 120px; display: flex; align-items: self-end;`}>{question.title}</h2>
                  <div css={css`display: flex;
                  align-items: center;
                  padding: 8px 12px;
                  gap: 8px;
                  width: 203px;
                  height: 37px;
                  background: linear-gradient(315deg, #FF6861 -0.12%, #FF8B86 99.88%);
                  border-radius: 32px;
                  margin: auto;
                  font-size: 14px;
                  p {flex-direction: column;}
                `}>
                    <p css={css`width: 100%;
                    text-align: center;
                    color: #fff;
                    font-weight: 600;
                    font-size: 14px;
                  `}>반대 85% &gt; 투표 하러가기</p>
                  </div>
                  {/* <VoteBar voteCount={question.vote_count} /> */}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        )
      })}
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
            {viewState === 'S01'
              ? <>
                {/* <SlideList questions={questions} /> */}
                <SwiperList questions={questions} />
              </>
              : viewState === 'S02'
                ? <>
                  <SwiperList2 questions={questions} />
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
