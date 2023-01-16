import React from 'react'
import Introduce from 'components/Introduce'
import QuestionList from 'components/question/QustionList'

const IndexPage = () => (
  <div>
    <Introduce />
    {/* <QuestionStats />*/}
    <QuestionList view={'main'}/>
  </div>
)

export default IndexPage
