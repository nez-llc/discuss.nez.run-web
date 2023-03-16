import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Pane from 'components/layout/Pane'
import Tags from 'components/ui/Tags'
import Markdown from 'components/ui/Markdown'
import AgendaMetaData from 'components/ui/AgendaMetaData'
import Vote from 'components/vote/Vote'
import RelatedReferences from 'components/agenda/RelatedReferences'
import Comments from 'components/comment/Comments'
import { getToken } from 'auth/commons'
import { useAgenda } from 'data/agenda'
import dayjs from 'dayjs'

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const QuestionPage = ({ agenda, agendaId, token}) => {
  const { currentAgenda, refresh } = useAgenda(agenda, agendaId)

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      gap: 20px;`}>
      <Pane>
        <div css={css`
          font-size: 15px;
          line-height: 22px;
          letter-spacing: -0.03em;
          margin-bottom: 30px;
        `}>{dayjs(new Date(agenda.created_time)).format('YYYY-MM-DD')}</div>
        <Title>{currentAgenda.title}</Title>
      </Pane>
      <Pane>
        <Markdown>{currentAgenda.summary}</Markdown>
        <Markdown>{currentAgenda.desc}</Markdown>
      </Pane>
      <Pane>
        <Vote
          currentAgenda={currentAgenda}
          refresh={refresh}
          token={token} />
      </Pane>
      <Pane>
        <Pane.Title>관련정책</Pane.Title>
        <RelatedReferences />
        <Tags tags={currentAgenda.tags} />
        <AgendaMetaData />
      </Pane>
      <Pane>
        <Comments agendaId={currentAgenda.id} />
      </Pane>
    </div>
  )
}

export const getServerSideProps = async (context) => {
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

export default QuestionPage
