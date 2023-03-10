import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import VoteBar from 'components/vote/VoteBar'
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
      <div css={css`width:70%; display: grid; gap: 10px;`}>
        <div css={css`width: 100%; padding: 0px 10px; height: 120px;`}>
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
const QuestionPreview = ({ question, view }) => {
  switch (view) {
    case 'L01':
      return (
        <Wrapper>
          <ListView question={question}/>
        </Wrapper>
      )
    case 'L02':
      return(
        <Wrapper>
          <ListView2 question={question}/>
          <hr css={css`width: 100%;
              border: 0;
              border-top: 1px solid #C4C4C4;
              margin: 0;`}/>
        </Wrapper>
      )
    case 'L03':
      return (
        <Wrapper>
          <ListView3 question={question}/>
          <hr css={css`width: 100%;
                border: 0;
                border-top: 1px solid #C4C4C4;
                margin: 0;`}/>
        </Wrapper>
      )
    case 'S01':
      return (
        <div css={css`text-decoration: none;`}>
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
        </div>
      )
    case 'S02':
      return(
        <div css={css`text-decoration: none;`}>
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
            </div>
          </div>
        </div>
      )
  }
}

export default QuestionPreview
