import { useEffect, useState } from 'react'

const useQuestions = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchAgendas = async () => {
      const response = await fetch(`${process.env.API_ENDPOINT}/api/agendas/`)
      const { items } = await response.json()

      setQuestions(items)
    }
    fetchAgendas()
  }, [])

  return {
    questions,
  }
}

export {
  useQuestions,
}
