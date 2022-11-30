import React from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'
import Markdown from 'components/ui/Markdown'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/ui/VoteBar'
import RelatedReferences from 'components/question/RelatedReferences'
import Comments from 'components/comment/Comments'
import {useApi} from "../../utils/api";
import {useAgenda} from "./agenda";

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const QuestionPage = ({ agendaId }) => {
    const { agenda, refresh } = useAgenda(agendaId)
    const { client } = useApi()

    const onUnauthorized = () => {
        alert('로그인이 필요합니다.');
    }

    const vote = async (agendaId, ballot) => {
        const { code, data } = await client.post(`/api/agendas/${agendaId}/votes`, {
            ballot
        })

        switch (code) {
            case 201: refresh(); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }
    }

    const up = async () => {
        const { code, data } = await client.post(`/api/agendas/${agendaId}/updown`, {
            updown: 'up'
        })

        switch (code) {
            case 201: refresh(); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }
    }
  return (
    <div>
      <Pane>
        <Title>{agenda.title}</Title>
        <Markdown>{agenda.summary}</Markdown>
        <hr />
        <Markdown>{agenda.desc}</Markdown>
        <Tags tags={agenda.tags} />
      </Pane>

      <Pane>
        <VoteBar voteCount={agenda.vote_count} />
      </Pane>

        <div
            css={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'row',
                // maxWidth: '100px',
                margin: '0 100px',
            }}
        >
            <button onClick={() => vote(agenda.id, 'agree')}>공감</button>
          <div
            css={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100px',
              margin: '0 auto',
            }}
          >
              <button onClick={() => vote(agenda.id, 'not_sure')}>몰루</button>
            <h3>{agenda.updown?.up}</h3>
            <button onClick={up}>추천</button>
          </div>
            <button onClick={() => vote(agenda.id, 'not_agree')}>비공감</button>
        </div>

      <Pane>
        <Pane.Title>관련정책</Pane.Title>
        <RelatedReferences />
      </Pane>

      <Pane>
        <Pane.Title>의견</Pane.Title>
        <Comments agendaId={agenda.id} />
      </Pane>
    </div>
  )
}

const getServerSideProps = ({ query }) => {
  return {
    props: {
      agendaId: query.id
    }
  }
}

export {
    getServerSideProps
}
export default QuestionPage