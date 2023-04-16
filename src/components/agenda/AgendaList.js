import Link from 'next/link'
import styled from '@emotion/styled'
import AgendaPreview from 'components/agenda/AgendaPreview'
import { useAgendas } from 'data/agenda'
import PrevPage from 'assets/icons/prev.svg?inline'
import NextPage from 'assets/icons/next.svg?inline'

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 24px;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
  
  a { 
    max-width: 380px;
    width: 100%;
    text-decoration: none;
  }
`

const Pagination = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  a {
    text-decoration: none;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
  
  button {
    border: 0;
    background: transparent;
  }
`

const PageItem = styled.ul`
  a {
    color: ${({ active }) => active ? '#1890FF' : 'rgba(0, 0, 0, 0.85)'};  
  }
`

const QuestionList = ({ query }) => {
  const { agendas, pagination } = useAgendas({
    query,
  })

  const totalPages = Math.ceil(pagination.total / pagination.per_page)
  // 페이지 번호 목록 생성
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <Wrapper>
      <List>
        {agendas.map(agenda => (
          <Link key={agenda.id} href={`/agenda/${agenda.id}`}>
            <AgendaPreview key={agenda.id} agenda={agenda} />
          </Link>
        ))}
      </List>
      <Pagination>
        <li>
          <button>
            <PrevPage fill={pagination.current_page === 1 ? '#D9D9D9' : '#000000'}/>
          </button>
        </li>
        {pages.map((page) => (
          <PageItem key={page} active={page === pagination.current_page}>
            <Link href={`?page=${page}`}>
              {page}
            </Link>
          </PageItem>
        ))}
        <li>
          <button>
            <NextPage fill={pagination.current_page === totalPages ? '#D9D9D9' : '#000000'}/>
          </button>
        </li>
      </Pagination>
    </Wrapper>
  )
}

export default QuestionList
