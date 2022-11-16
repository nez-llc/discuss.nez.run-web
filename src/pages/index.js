import React from 'react'
import Introduce from 'components/Introduce'
import QuestionStats from 'components/question/QuestionStats'
import QuestionList from 'components/question/QustionList'

const IndexPage = () => (
  <div>
    <Introduce />
    <QuestionStats />
    <QuestionList />
  </div>
)

export default IndexPage
