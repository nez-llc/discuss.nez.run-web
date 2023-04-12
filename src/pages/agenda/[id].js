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
import { mq } from 'theme'

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`

const Summary = styled.div`
  border-left: 3px solid #828282;
  padding-left: 24px;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: -0.028em;
  
  ${mq.mobile} {
    padding-left: 12px;
  }
`

const Title = styled.h2`
  margin-bottom: 24px;

  font-weight: 700;
  font-size: 25px;
  line-height: 38px;
  color: #000000;

`

const Date = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;

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
          <Summary>
            <Markdown>{agenda.summary}</Markdown>
          </Summary>
          <Markdown>{agenda.desc}</Markdown>
        </Pane>
        <Pane>
          {/* TODO : 투표 후 업데이트 */}
          <VoteBar agendaId={agenda.id} votes={votes} expandable />
          <VoteButtons agendaId={agenda.id} onVote={refreshVotes} />
        </Pane>
        <Pane>
          <Pane.Title>관련 뉴스</Pane.Title>
          <RelatedReferences agendaId={agenda.id} />
        </Pane>
        <Pane>
          <Pane.Title>관련 정책</Pane.Title>
          <RelatedReferences agendaId={agenda.id} />
        </Pane>
        <Pane>
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
