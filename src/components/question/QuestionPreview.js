import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/ui/VoteBar'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'


const Recommended = styled.h2`
`

const Info = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 8px;
  }
`

const sum = arr => arr.reduce((a, b) => a + b, 0)


const detailDate = (agendaDate) => {
  dayjs.extend(duration)

  let timeDiff = dayjs.duration(dayjs().diff(agendaDate))
  let result = ''

  if(timeDiff.years() > 0){
    result = `${timeDiff.years()}년 전`
  }else if(timeDiff.months() > 0){
    result = `${timeDiff.months()}개월 전`
  }else if(timeDiff.days() > 0){
    result = `${timeDiff.days()}일 전`
  }else if(timeDiff.hours() > 0){
    result = `${timeDiff.hours()}시간 전`
  }else if(timeDiff.minutes() > 0){
    result = `${timeDiff.minutes()}분 전`
  }else if(timeDiff.seconds() > 0){
    result = `${timeDiff.seconds()}초 전`
  }

  return result
}

const Stat = ({ question }) => {
  return (
    <div
      css={css`
      font-size: small;
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
        <dd>{question.updown?.total}</dd>
        <dt>투표</dt>
        <dd>{sum(Object.values(question.vote_count))}</dd>
        <dt>댓글</dt>
        <dd>{question.comment_count}</dd>
        <dt css={css`margin-left: auto;`}>{detailDate(question.created_time)}</dt>
      </dl>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 15px;
`

const QuestionPreview = ({ question }) => (
  <Wrapper>
    <div css={css`
      display: flex;
      gap: 5px;
    `}>
      <div css={css`
            width:30%;
          `}>
        <img css={css`
          height: 100px;
          object-fit: cover;
        `} src={'https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_1280.jpg'}/>
      </div>
      <div css={css`
            width:70%;
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}>
        <h4>{question.title}</h4>
        <p css={css`
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical;
        `}>{question.desc}</p>
      </div>
    </div>
    <div css={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `}>
      <VoteBar voteCount={question.vote_count} />
      <Tags tags={question.tags}></Tags>
      <Stat question={question} />
    </div>
    {/* <div> */}
    {/*  <Recommended>{question.recommended}</Recommended> */}
    {/* </div> */}

    {/* <Info> */}
    {/*   <h3><img src={''} />{question.title}</h3> */}
    {/*   <Markdown>{question.desc}</Markdown> */}
    {/* </Info> */}
    {/* <Tags tags={question.tags} /> */}
    {/* <VoteBar voteCount={question.vote_count} /> */}
    {/* <Stat question={question} /> */}
  </Wrapper>
)

export default QuestionPreview
