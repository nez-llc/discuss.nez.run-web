import {useCallback, useEffect, useState} from 'react'
import {useApi} from 'utils/api'

const useAgenda = agendaId => {
    const { client } = useApi()
    const [agenda, setAgenda] = useState([])

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
        refresh
    }
}

export {
    useAgenda,
}