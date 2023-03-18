import React from 'react'
import Introduce from 'components/Introduce'
import QuestionList from 'components/agenda/AgendaList'

const IndexPage = () => (
  <div>
    <Introduce />
    {/* <AgendaStats />*/}
    <QuestionList/>
  </div>
)

export default IndexPage
