import React from 'react'
import styled from '@emotion/styled'
import Tags from 'components/ui/Tags'


const Info = styled.div`
  margin: 15px 0;
  h3 {
    font-size: inherit ;
  }
`

const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1fr 11fr;
`

const Index = styled.div`
  font-size: 23px;
  color: #d7d7d7;
  text-align: center;
  font-weight: bold;
`
const Preview = styled.div`
`
const Updown = styled.div`
  margin-left: 20px;
`

const MainQuestionPreview = ({ question, index }) => (
  <Wrapper>
    <Index>{('00' + index).slice(-2)}</Index>
    <Preview>
      <Tags tags={question.tags} />
      <Info>
        <h3>{question.title}</h3>
      </Info>
      <Updown>
        {question.updown.total ? question.updown.total : ''}
      </Updown>
    </Preview>
  </Wrapper>
)

export default MainQuestionPreview
