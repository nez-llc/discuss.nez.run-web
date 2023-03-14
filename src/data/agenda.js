import {useCallback, useEffect, useState} from 'react'
import {useApi} from 'utils/api'

const useAgendas = (tag, keyword, sort, searchType) => {
  const { client } = useApi()
  const [agendas, setAgendas] = useState([])
  const [total, setTotal] = useState(0)
  const [per_page, setPer_page] = useState(0)

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }
  useEffect(() => {
    const fetchAgendas = async () => {
      const param = {}
      if (tag) {
        param['tag_name'] = tag
      }
      if (keyword) {
        param['keyword'] = keyword
      }
      if (sort) {
        param['sort'] = sort
      }
      if (searchType) {
        param['search_type'] = searchType
      }
      const { code, data } = await client.get('/api/agendas/', param)

      switch (code) {
        // case 400: onBadRequest(data) break
        case 401: onUnauthorized(); return
        // case 500:
        // default:
        //   onServerError(data)
        //   break
      }
      setAgendas(data.items)
      setTotal(data.total)
      setPer_page(data.per_page)
    }
    fetchAgendas()
  }, [tag, keyword, client.token])

  return {
    agendas,
    total,
    per_page,
  }
}

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

const useAgendaVote = (agendaId) => {
  const { client } = useApi()
  const [vote, setVote] = useState([])

  const voteRefresh = useCallback(async () => {
    const { code, data } = await client.get(`/api/agendas/${agendaId}/votes`)

    switch (code) {
      case 200: setVote(data); break
    }
  }, [agendaId])

  useEffect(() => {
    voteRefresh()
  }, [agendaId])

  return {
    vote,
    voteRefresh,
  }
}

export {
  useAgendas,
  useAgenda,
  useMyAgenda,
  useAgendaVote,
}
