import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'

const Stats = styled.ul`
  display: flex;
  justify-content: space-between;
  max-width: 320px;
  margin: 0 auto;
`

const StatItem = styled.li`
  text-align: center;
`

const Label = styled.h3`
  font-size: 16px;
`

const Value = styled.p`
  font-size: 16px;
`

const AgendaStats = () => {
  const [loaded, setLoaded] = useState(false)
  const [stats, setStats] = useState({})

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${process.env.API_ENDPOINT}/api/statistics`)
      const data = await response.json()

      setStats(data)
      setLoaded(true)
    }
    fetchStats()
  }, [])

  // TODO : 로딩 되기 전에도 같은 사이즈 유지

  return (
    <Pane>
      {loaded &&
        <Stats>
          <StatItem>
            <Label>질문</Label>
            <Value>{stats.agenda_count.toLocaleString()}개</Value>
          </StatItem>
          <StatItem>
            <Label>의견</Label>
            <Value>{stats.comment_count.toLocaleString()}개</Value>
          </StatItem>
          <StatItem>
            <Label>투표</Label>
            <Value>{stats.vote_count.toLocaleString()}회</Value>
          </StatItem>
        </Stats>
      }
    </Pane>
  )
}

export default AgendaStats
