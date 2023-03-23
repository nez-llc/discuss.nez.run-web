import {useCallback, useEffect, useState} from 'react'
import {useApi} from 'utils/api'

const useAgendas = query => {
  const { client } = useApi()
  const [agendas, setAgendas] = useState([])
  const [pagination, setPagination] = useState({})

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  useEffect(() => {
    const fetchAgendas = async () => {
      const { code, data } = await client.get('/api/agendas/', query)

      switch (code) {
        // case 400: onBadRequest(data) break
        case 401: onUnauthorized(); return
        // case 500:
        // default:
        //   onServerError(data)
        //   break
      }
      setAgendas(data.items)
    }
    fetchAgendas()
  }, [client.token, query.featured])

  return {
    agendas,
  }
}

const useAgenda = agendaId => {
  const { client } = useApi()
  const [agenda, setAgenda] = useState()

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

export {
  useAgendas,
  useAgenda,
}
