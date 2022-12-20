import React from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'
import Markdown from 'components/ui/Markdown'
import Tags from 'components/ui/Tags'
import VoteBar from 'components/ui/VoteBar'
import RelatedReferences from 'components/question/RelatedReferences'
import Comments from 'components/comment/Comments'
import {useApi} from "utils/api";
import {useAgenda} from "./agenda";
import {getToken} from "auth/commons";

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`

const QuestionPage = ({ _agenda, agendaId, token}) => {
    const { agenda, refresh, setAgenda } = useAgenda(token, agendaId)
    const { client } = useApi()

    if (!agenda) {
        setAgenda(_agenda)
    }

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

    const doUpDown = async (updown) => {
        const { code, data } = await client.post(`/api/agendas/${agendaId}/updown`, {
            updown
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
            <h3>추천 : {agenda.updown?.up}</h3>
            <h3>비추천 : {agenda.updown?.down}</h3>
              {
                  (agenda.my_updown === 'up') ? (
                      <>
                          <button onClick={() =>doUpDown('down')}>비추천으로 변경</button>
                      </>
                  ) : (agenda.my_updown === 'down') ? (
                      <>
                          <button onClick={() =>doUpDown('up')}>추천으로 변경</button>
                      </>
                  ) : (
                      <>
                          <button onClick={() =>doUpDown('up')}>추천</button>
                          <button onClick={() =>doUpDown('down')}>비추천</button>
                      </>
                  )
              }
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

const getServerSideProps = async (context) => {
    const token = getToken(context);
    const fetchAgenda = async () => {
        const response = await fetch(`${process.env.API_ENDPOINT}/api/agendas/${context.query.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return await response.json()
    }

    const _agenda = await fetchAgenda();

  return {
    props: {
      _agenda,
      agendaId: context.query.id,
        token: (token ? token : '')
    }
  }
}

export {
    getServerSideProps
}
export default QuestionPage