import QuestionList from 'components/agenda/AgendaList'
import {useEffect, useState} from 'react'
import QuestionSearch from 'components/agenda/AgendaSearch'
import Router, {useRouter} from 'next/router'

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
    <div>
      <QuestionSearch searchValue={searchValue} setSearchValue={setSearchValue} setSearchType={setType} searchType={type} search={search}/>
      <QuestionList tag={tag} keyword={keyword} sort={sort} searchType={searchType}/>
    </div>
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
