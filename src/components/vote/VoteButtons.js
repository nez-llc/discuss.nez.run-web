import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import { useApi } from 'utils/api'

const VoteButton = styled(Button)`
  color : ${props => props.color};
  background: #fff;
`

const Wrapper = styled.div`
  display: flex;
  gap: 1px;
  
  ${VoteButton} {
    flex: 1;
  }
  ${VoteButton}:first-of-type {
    border-radius: 10px 4px 4px 10px;
  }
  ${VoteButton}:last-of-type{
    border-radius: 4px 10px 10px 4px;
  }
`

const VoteButtons = ({ agendaId, onVote }) => {
  const { client } = useApi()

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  // TODO : useCallback
  const vote = async ballot => {
    const { code, data } = await client.post(`/api/agendas/${agendaId}/votes`, {
      ballot,
    })

    switch (code) {
      case 401:
        onUnauthorized()
        return
      case 201:
        onVote(data)
    }
  }

  return (
    <Wrapper>
      <VoteButton color="#EA0000" onClick={() => vote('strongly_disagree')}>매우 비동의</VoteButton>
      <VoteButton color="#FF5B51" onClick={() => vote('disagree')}>비동의</VoteButton>
      <VoteButton color="#8A8A8A" onClick={() => vote('neither')}>중립</VoteButton>
      <VoteButton color="#1D95FE" onClick={() => vote('agree')}>동의</VoteButton>
      <VoteButton color="#005FCF" onClick={() => vote('strongly_agree')}>매우 동의</VoteButton>
    </Wrapper>
  )
}

export default VoteButtons
