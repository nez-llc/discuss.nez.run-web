import {useState} from 'react'
import styled from '@emotion/styled'
import {useApi} from 'utils/api'
import {useMyAgenda} from 'data/agenda'
import {css} from '@emotion/react'

const Wrapper = styled.div`
  padding-top: 20px;
`

const VoteButtonBar = styled.div`
  text-align: center;
  display: flex;
  gap: 1px;
`

const VoteButton = styled.button`
  width: 20%;
  height: 35px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 0.8px solid #E0DDDD;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  
  font-size: 10px;

  color : ${props => props.color};
  ${props => props.index === 0 ? 'border-radius: 10px 4px 4px 10px;'
    : props.index === 4 ? 'border-radius: 4px 10px 10px 4px;'
      : 'border-radius: 4px;'}
  
`

const VoteActiveBtn = styled.div`
  margin-top: 10px;
  text-align: center;
  
  button{
    font-size: 9px;
    line-height: 13px;
    text-align: center;
    color: #C4C4C4;
    border: 0;
    background: transparent;
  }
  
  span{
    color: #AFAFAF;  
  }
`

const VoteButtons = ({ voteCount, currentAgenda, refresh, token }) => { // my_updown
  const { client } = useApi()
  const [ voteResultView, setVoteResultView ] = useState(false)
  const [ voteResultViewText, setVoteResultViewText ] = useState('결과 보기')
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

  const setVoteResultViewState = () => {
    if(voteResultView){
      setVoteResultViewText('결과 보기')
    }else{
      setVoteResultViewText('결과 닫기')
    }
    setVoteResultView(!voteResultView)
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

  // const tmp = {'very_disagree': 111, 'disagree': 4, 'neutral': 8, 'agree': 10, 'very_agree': 22}
  const voteTotCnt = Object.values(voteCount).reduce((acc, curr) => acc + curr, 0)
  const maxVoteValue = Math.max(...Object.values(voteCount))

  const mappedVoteObj = Object.keys(voteCount).map((key) => {
    let css = {
      backgroundColor: '#DADADA',
      color: '#8A8A8A',
    }
    let name = '중립'

    switch (key){
      case 'very_disagree':
        css.backgroundColor = '#F97C7C'
        css.color = '#EA0000'
        name = '강한 반대'
        break
      case 'disagree':
        css.backgroundColor = '#FFA9A9'
        css.color = '#FF5B51'
        name = '약한 반대'
        break
      case 'agree':
        css.backgroundColor = '#6EB4F1'
        css.color = '#1D95FE'
        name = '약한 찬성'
        break
      case 'very_agree':
        css.backgroundColor = '#0088FF'
        css.color = '#005FCF'
        name = '강한 찬성'
        break
    }

    return {
      key: key,
      value: voteCount[key],
      css: css,
      name: name,
    }
  })

  const getVoteTextStyle = (value) => {
    const per = value/maxVoteValue * 100

    if(per <= 10){
      return {
        position: 'relative',
        top: '-15px',
        color: '#c4c4c4'
      }
    }

    return {
      paddingTop: '3px'
    }
  }

  return (
    <Wrapper>
      { voteResultView ?
        <div>
          <ul css={css`display: flex;`}>
            {mappedVoteObj.map((item) => (
              <li key={item.key} css={css`
                width: 20%;
                display: grid;
                justify-content: center;
                align-items: self-end;
                height: 150px`}>
                <div css={css`
                  width: 40px;
                  height: ${item.value/maxVoteValue * 100}%;
                  background: ${item.css.backgroundColor};
                  text-align: center;
                  color: #fff;
                  font-size: 10px;
                `}>
                  <p style={{...getVoteTextStyle(item.value)}}>
                    {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        : ''}
      <VoteButtonBar>
        <>
          {mappedVoteObj.map((item, index) => (
            <VoteButton key={item.key} index={index} color={item.css.color}
              onClick={() => vote(currentAgenda.id, item.key)}>
              {item.name}
            </VoteButton>
          ))}
        </>
      </VoteButtonBar>
      <VoteActiveBtn>
        <button onClick={() => setVoteResultViewState(true)}>{voteResultViewText}&nbsp;<span>(총 투표수 {voteTotCnt})</span></button>
      </VoteActiveBtn>
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
