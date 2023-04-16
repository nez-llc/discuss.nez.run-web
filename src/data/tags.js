import { useCallback, useEffect, useState } from 'react'
import { useApi } from 'utils/api'

export const useTagsData = () => {
  const { client } = useApi()
  const [data, setData] = useState({})

  const fetchData = useCallback(async () => {
    const { data: tags } = await client.get('/api/tags')

    setData(tags)
  }, [client])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    refresh: fetchData,
    tags: data,
  }
}
