import styled from '@emotion/styled'
import Container from 'components/layout/Container'
import Pane from 'components/layout/Pane'
import Tags from 'components/ui/Tags'
import Markdown from 'components/ui/Markdown'
import AgendaMetaData from 'components/agenda/AgendaMetaData'
import RelatedReferences from 'components/agenda/RelatedReferences'
import Comments from 'components/comment/Comments'
import VoteBar from 'components/vote/VoteBar'
import VoteButtons from 'components/vote/VoteButtons'
import { format } from 'utils/date'
import { useVoteData } from 'data/votes'

const Wrapper = styled.div`
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const Date = styled.div`
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.03em;
  margin-bottom: 30px;
`

const QuestionPage = ({ agenda }) => {
  const { refresh: refreshVotes, votes } = useVoteData(agenda.id)

  return (
    <Container>
      <Wrapper>
        <Pane>
          <Date>
            {format('YYYY-MM-DD', agenda.created_time)}
          </Date>
          <Title>{agenda.title}</Title>
        </Pane>
        <Pane>
          <Markdown>{agenda.summary}</Markdown>
          <Markdown>{agenda.desc}</Markdown>
        </Pane>
        <Pane>
          {/* TODO : 투표 후 업데이트 */}
          <VoteBar agendaId={agenda.id} votes={votes} expandable />
          <VoteButtons agendaId={agenda.id} onVote={refreshVotes} />
        </Pane>
        <Pane>
          <Pane.Title>관련정책</Pane.Title>
          <RelatedReferences agendaId={agenda.id} />
          <Tags tags={agenda.tags} />
          <AgendaMetaData />
        </Pane>
        <Pane>
          <Comments agendaId={agenda.id} />
        </Pane>
      </Wrapper>
    </Container>
  )
}

export const getServerSideProps = async context => {
  const response = await fetch(`${process.env.API_ENDPOINT}/api/agendas/${context.query.id}`)
  const agenda = await response.json()

  return {
    props: {
      agenda,
    }
  }
}

export default QuestionPage
