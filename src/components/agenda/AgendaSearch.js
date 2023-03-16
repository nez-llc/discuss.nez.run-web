import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding: 16px 0;
`

const QuestionSearch = ({searchValue, setSearchValue, setSearchType, searchType, search}) => {
  const changeSearchType = (e) => {
    setSearchType(e.target.value)
  }
  return (
    <Wrapper>
      <select onChange={changeSearchType}>
        <option value={'all'} selected={searchType === 'all'}>모두</option>
        <option value={'title'} selected={searchType === 'title'}>제목</option>
        <option value={'summary'} selected={searchType === 'summary'}>요약</option>
        <option value={'desc'} selected={searchType === 'desc'}>설명</option>
      </select>
      <input value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={e => (e.key === 'Enter') ? search() : ''}
      />
      <button onClick={search}>검색</button>
    </Wrapper>
  )
}

export default QuestionSearch
