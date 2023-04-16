import React, { useEffect, useState } from 'react'
import Container from 'components/layout/Container'
import AgendaList from 'components/agenda/AgendaList'
import AgendaSearch from 'components/agenda/AgendaSearch'
import Router, { useRouter } from 'next/router'
import Pane from 'components/layout/Pane'
import Image from 'next/image'
import Sort from 'assets/icons/sort.svg'
import styled from '@emotion/styled'
import Tags from 'components/ui/Tags'
import {useTagsData} from 'data/tags'

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`

const AgendaSort = styled(Pane)`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: #000000;
  
  p{
    margin: 0;
  }
  
  img {
    margin-left: auto;
  }
`

const SortFilters = styled.div`
  padding: 13px;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  width: 127px;
  background: #FFFFFF;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  
  p {
    text-align: center;
    padding: 4px 0;
  }
  
  p:first-of-type{
    border-bottom: 1px solid #BDBDBD;
  }
`

const FeaturedTags = styled(Pane)`
  display: grid;
  gap: 10px;
  
  p{
    margin: 0;
  }
`

const QuestionListPage = ({tag, keyword, sort, searchType}) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState(keyword)
  const [type, setType] = useState(searchType)
  const [showFilters, setShowFilters] = useState(false)
  const [filtersTop, setFiltersTop] = useState(0)
  const [filtersLeft, setFilterLeft] = useState(0)
  const {tags} = useTagsData()

  useEffect(() => {
  }, [router.query])

  const search = () => {
    Router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: searchValue, searchType: type },
    })
  }

  function handleClick(event) {
    const rect = event.target.getBoundingClientRect()

    setFiltersTop(rect.top + 20)
    setFilterLeft(rect.left - 100)
    setShowFilters(!showFilters)
  }

  return (
    <Container>
      <Wrapper>
        <AgendaSort>
          <p>모든 토론</p>
          <Image src={Sort} alt="정렬" onClick={handleClick}/>
          {showFilters && (
            <SortFilters top={filtersTop} left={filtersLeft}>
              <p>최신순</p>
              <p>인기순</p>
            </SortFilters>
          )}
        </AgendaSort>
        {/* <AgendaSearch searchValue={searchValue} setSearchValue={setSearchValue} setSearchType={setType} searchType={type} search={search}/> */}
        <FeaturedTags>
          <p>추천태그</p>
          <Tags tags={tags}/>
        </FeaturedTags>
        <Pane>
          <AgendaList tag={tag} keyword={keyword} sort={sort} searchType={searchType}/>
        </Pane>
      </Wrapper>
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
