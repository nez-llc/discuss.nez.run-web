import {useEffect, useState} from 'react'
import {useApi} from "../utils/api";

const useQuestions = (tag) => {
  const { client } = useApi()
  const [questions, setQuestions] = useState([])
  const [total, setTotal] = useState(0)

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }
  useEffect(() => {
    const fetchAgendas = async () => {
      const { code, data } = await client.get(`/api/agendas/${tag? `?tag_name=${tag}` : ''}`)

      switch (code) {
          // case 400: onBadRequest(data) break
        case 401: onUnauthorized(); return;
          // case 500:
          // default:
          //   onServerError(data)
          //   break
      }
      setQuestions(data.items)
      setTotal(data.total)
    }
    fetchAgendas()
  }, [tag, client])

  return {
    questions,
    total
  }
}

export {
  useQuestions,
}
