import { useEffect, useState } from 'react'
import Container from 'components/layout/Container'
import AgendaList from 'components/agenda/AgendaList'
import AgendaSearch from 'components/agenda/AgendaSearch'
import Router, { useRouter } from 'next/router'

const QuestionListPage = ({tag, keyword, sort, searchType}) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(keyword)
  const [type, setType] = useState(searchType)

  useEffect(() => {
  }, [router.query])

  const search = () => {
    Router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: searchValue, searchType: type },
    })
  }

  return (
    <Container>
      <AgendaSearch searchValue={searchValue} setSearchValue={setSearchValue} setSearchType={setType} searchType={type} search={search}/>
      <AgendaList tag={tag} keyword={keyword} sort={sort} searchType={searchType}/>
    </Container>
  )
}

const getServerSideProps = async ({query}) => ({
  props: {
    tag: query.tag || '',
    keyword: query.keyword || '',
    sort: query.sort || '',
    searchType: query.searchType || '',
  }
})

export {
  getServerSideProps
}

export default QuestionListPage
