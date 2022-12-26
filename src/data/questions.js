import {useEffect, useState} from 'react'
import {useApi} from "../utils/api";

const useQuestions = (tag, keyword) => {
  const { client } = useApi()
  const [questions, setQuestions] = useState([])
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
      const { code, data } = await client.get('/api/agendas/', param)

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
      setPer_page(data.per_page)
    }
    fetchAgendas()
  }, [tag, keyword, client.token])

  return {
    questions,
    total,
    per_page,
  }
}

export {
  useQuestions,
}
