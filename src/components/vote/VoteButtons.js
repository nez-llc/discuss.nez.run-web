import {useState} from 'react'
import styled from '@emotion/styled'
import {useApi} from 'utils/api'
import {useMyAgenda} from 'data/agenda'

const Wrapper = styled.div`
  margin: 10px 0px;
`

const VoteButtonBar = styled.div`
  text-align: center;
  button{
    width: 60px;
    height: 15px;
    margin-right: 5px;
    border-radius: 5px;
    border: 0;
  }
  buttonnth-of-type(1){ background-color: #F97C7C; }
  buttonnth-of-type(2){ background-color: #FFA9A9; }
  buttonnth-of-type(3){ background-color: #DADADA; }
  buttonnth-of-type(4){ background-color: #0088FF; }
  buttonnth-of-type(5){ background-color: #0088FF; }
`

const VoteActiveBtn = styled.div`
  text-align: center;
  button{
    height: 30px;
    border-radius: 5px;
    border: 1px solid #DADADA;
    background: #DADADA;
    width: 40%;
    font-size: small;
  }
`

const VoteButtons = ({ currentAgenda, refresh, token }) => { // my_updown
  const { client } = useApi()
  const [ voteActive, setVoteActive ] = useState(false)
  const { my_updown, myAgendaRefresh } = useMyAgenda(token, currentAgenda.id)

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  const vote = async (agendaId, ballot) => {
    const { code, data } = await client.post(`/api/agendas/${currentAgenda.id}/votes`, {
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

  const setVoteState = (state) => {
    setVoteActive(state)
  }

  const doUpDown = async (updown) => {
    const { code, data } = await client.post(`/api/agendas/${currentAgenda.id}/updown`, {
      updown
    })

    switch (code) {
      case 201: refresh(); myAgendaRefresh(); break
      // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      // case 500:
      // default:
      //   onServerError(data)
      //   break
    }
  }
  return (
    <Wrapper>
      {voteActive ?
        <VoteButtonBar>
          <button onClick={() => vote(currentAgenda.id, 'very_disagree')} />
          <button onClick={() => vote(currentAgenda.id, 'disagree')} />
          <button onClick={() => vote(currentAgenda.id, 'neutral')} />
          <button onClick={() => vote(currentAgenda.id, 'agree')} />
          <button onClick={() => vote(currentAgenda.id, 'very_agree')} />
        </VoteButtonBar>
        :
        <VoteActiveBtn>
          <button onClick={() => setVoteState(true)}>바로 투표하기</button>
        </VoteActiveBtn>
      }
      {/* <div> */}
      {/*   <h3>추천 : {currentAgenda.updown?.up}</h3> */}
      {/*   <h3>비추천 : {currentAgenda.updown?.down}</h3> */}
      {/*   { */}
      {/*     (my_updown === 'up') ? ( */}
      {/*       <> */}
      {/*         <button onClick={() => doUpDown('down')}>비추천으로 변경</button> */}
      {/*       </> */}
      {/*     ) : (my_updown === 'down') ? ( */}
      {/*       <> */}
      {/*         <button onClick={() => doUpDown('up')}>추천으로 변경</button> */}
      {/*       </> */}
      {/*     ) : ( */}
      {/*       <> */}
      {/*         <button onClick={() => doUpDown('up')}>추천</button> */}
      {/*         <button onClick={() => doUpDown('down')}>비추천</button> */}
      {/*       </> */}
      {/*     ) */}
      {/*   } */}
      {/* </div> */}
    </Wrapper>
  )
}

export default VoteButtons
