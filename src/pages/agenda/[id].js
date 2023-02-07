import React from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'
import Markdown from 'components/ui/Markdown'
import Tags from 'components/ui/Tags'
import Vote from 'components/vote/Vote'
import RelatedReferences from 'components/question/RelatedReferences'
import Comments from 'components/comment/Comments'
import {useAgenda, useMyAgenda} from './agenda'
import {getToken} from 'auth/commons'

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const QuestionPage = ({ agenda, agendaId, token}) => {
  const { currentAgenda, refresh } = useAgenda(agenda, agendaId)
  const { my_updown, myAgendaRefresh } = useMyAgenda(token, agendaId)

  return (
    <div>
      <Pane>
        <Title>{currentAgenda.title}</Title>
        <Markdown>{currentAgenda.summary}</Markdown>
        <Markdown>{currentAgenda.desc}</Markdown>
        <img src={'https://static.dogmate.co.kr/blog/wp-content/uploads/2018/12/18171411/pasted_image_0.png'} />
        <Vote
          currentAgenda={currentAgenda}
          refresh={refresh}
          my_updown={my_updown}
          myAgendaRefresh={myAgendaRefresh} />
        <Tags tags={currentAgenda.tags} />
      </Pane>
      <Pane>
        <Comments agendaId={currentAgenda.id} />
      </Pane>
      <Pane>
        <Pane.Title>관련정책</Pane.Title>
        <RelatedReferences />
      </Pane>
    </div>
  )
}

const getServerSideProps = async (context) => {
  const token = getToken(context)
  const fetchAgenda = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/api/agendas/${context.query.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return await response.json()
  }

  const agenda = await fetchAgenda()

  return {
    props: {
      agenda,
      agendaId: context.query.id,
      token: (token ? token : '')
    }
  }
}

export {
  getServerSideProps
}
export default QuestionPage