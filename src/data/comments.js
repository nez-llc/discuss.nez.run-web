import {useEffect, useState} from 'react'
import {useApi} from "../utils/api";

const useComments = agendaId => {
  const { client } = useApi()
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const { code, data } = await client.get(`/api/agendas/${agendaId}/comments`)

      setComments(data)
    }
    fetchComments()
  }, [])

  return {
    comments,
  }
}

export {
  useComments,
}
