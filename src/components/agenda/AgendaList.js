import Link from 'next/link'
import styled from '@emotion/styled'
import AgendaPreview from 'components/agenda/AgendaPreview'
import { useAgendas } from 'data/agenda'

const Wrapper = styled.div`
  max-width: 380px;
`

const List = styled.ul`
  a { 
    text-decoration: none;
  }
`

const QuestionList = ({ query }) => {
  const { agendas, pagination } = useAgendas({
    query,
  })

  return (
    <Wrapper>
      <List>
        {agendas.map(agenda => (
          <Link key={agenda.id} href={`/agenda/${agenda.id}`}>
            <AgendaPreview key={agenda.id} agenda={agenda} />
          </Link>
        ))}
      </List>
    </Wrapper>
  )
}

export default QuestionList
