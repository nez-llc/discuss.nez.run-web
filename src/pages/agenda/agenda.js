import {useCallback, useEffect, useState} from 'react'
import {useApi} from 'utils/api'

const useAgenda = (oldAgenda, agendaId) => {
  const { client } = useApi()
  const [agenda, setAgenda] = useState(oldAgenda)

  const refresh = useCallback(async () => {
    const { code, data } = await client.get(`/api/agendas/${agendaId}`)

    switch (code) {
      case 200: setAgenda(data); break
    }
  }, [agendaId])

  useEffect(() => {
    refresh()
  }, [agendaId])

  return {
    currentAgenda: agenda,
    refresh,
  }
}
const useMyAgenda = (token, agendaId) => {
  const { client } = useApi(token)
  const [my_updown, setMy_updown] = useState('none')

  const myAgendaRefresh = useCallback(async () => {
    const { code, data } = await client.get(`/api/agendas/${agendaId}/my`)

    switch (code) {
      case 200: setMy_updown(data.my_updown); break
    }
  }, [agendaId])

  useEffect(() => {
    myAgendaRefresh()
  }, [agendaId])

  return {
    my_updown,
    myAgendaRefresh,
  }
}

export {
  useAgenda,
  useMyAgenda,
}