import { useCallback, useEffect, useState } from 'react'
import { useApi } from 'utils/api'

export const VOTE_LABELS = {
  strongly_disagree: '매우 비동의',
  disagree: '비동의',
  neither: '찬성도 반대도 하지 않음',
  agree: '동의',
  strongly_agree: '매우 동의',
}

export const COLORS = {
  strongly_disagree: '#f87c7c',
  disagree: '#ffa9a9',
  neither: '#dadada',
  agree: '#6eb4f1',
  strongly_agree: '#0188ff',
}

export const useVoteData = agendaId => {
  const { client } = useApi()
  const [data, setData] = useState({})

  const fetchData = useCallback(async () => {
    const { data: payload } = await client.get(`/api/agendas/${agendaId}/votes`)

    const stat = {
      strongly_disagree: 0,
      disagree: 0,
      neither: 0,
      agree: 0,
      strongly_agree: 0,
      total: 0,
    }

    for (const vote of payload) {
      stat[vote.value]++
      stat.total++
    }

    setData(stat)
  }, [agendaId, client])

  useEffect(() => {
    fetchData()
  }, [agendaId, fetchData])

  return {
    refresh: fetchData,
    votes: data,
  }
}
