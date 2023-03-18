import { useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import SearchImg from 'assets/search.png'

const SearchButton = styled(Button)`
  margin-left: auto;
  border: 0;
  background: url("${SearchImg.src}") no-repeat center;
  background-size: 15px;
  
  opacity: 0.5;
`

const Search = () => {
  const [opened, setOpened] = useState(false)

  return (
    <SearchButton />
  )
}

export default Search
