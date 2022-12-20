import {useCallback, useEffect, useState} from 'react'
import {useApi} from 'utils/api'

const useAgenda = (token, agendaId) => {
    const { client } = useApi(token)
    const [agenda, setAgenda] = useState(false)

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
        agenda,
        refresh,
        setAgenda,
    }
}

export {
    useAgenda,
}