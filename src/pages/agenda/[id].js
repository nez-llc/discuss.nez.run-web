import React, {useEffect, useRef, useState} from 'react'
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

const StickyLine = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  
`

const Vote = styled(Pane)`
  background-color: #EBEEF2;
  padding: 10px 20px;

  position: ${({ isSticky }) => isSticky ? 'sticky' : 'block'};
  bottom: 0;
  top: 0;
`

const QuestionPage = ({ agenda }) => {
  const { refresh: refreshVotes, votes } = useVoteData(agenda.id)
  const stickyRef = useRef(null)
  const checkRef = useRef(null)

  const [isSticky, setIsSticky] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const { bottom } = checkRef.current.getBoundingClientRect()
      const scrolledHeight = window.scrollY
      const targetHeight = bottom - window.innerHeight + 275

      if (scrolledHeight >= targetHeight) {
        setIsSticky(false)
      } else {
        setIsSticky(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Container>
      <Wrapper>
        <Pane ref={checkRef}>
          <Date>
            {format('YYYY-MM-DD', agenda.created_time)}
          </Date>
          <Title>{agenda.title}</Title>
          <Summary>
            <Markdown>{agenda.summary}</Markdown>
          </Summary>
          <Markdown>{agenda.desc}</Markdown>
          <StickyLine ref={stickyRef} />
        </Pane>
        <Vote isSticky={isSticky}>
          <VoteBar agendaId={agenda.id} votes={votes} expandable isSticky={isSticky} />
          <VoteButtons agendaId={agenda.id} onVote={refreshVotes} />
        </Vote>
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
