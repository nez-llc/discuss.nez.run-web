import { useCallback, useEffect, useState } from 'react'
import { useApi } from 'utils/api'

const useComments = agendaId => {
  const { client } = useApi()
  const [comments, setComments] = useState([])

  const mutate = useCallback(async () => {
    const { code, data } = await client.get(`/api/agendas/${agendaId}/comments`)

    switch (code) {
      case 200: setComments(data); break
    }
  }, [agendaId])

  useEffect(() => {
    mutate()
  }, [agendaId])

  return {
    comments,
    mutate,
  }
}

export {
  useComments,
}
