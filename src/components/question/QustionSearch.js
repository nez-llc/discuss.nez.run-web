import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  padding: 16px 0;
`

const QuestionSearch = ({searchValue, setSearchValue, search}) => {

    return (
        <Wrapper>
            <input value={searchValue}
                   onChange={e => setSearchValue(e.target.value)}
                   onKeyDown={e => (e.key === 'Enter') ? search() : ''}
            />
            <button onClick={search}>검색</button>
        </Wrapper>
    )
}

export default QuestionSearch
