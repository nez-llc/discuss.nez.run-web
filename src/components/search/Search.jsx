import { useState } from 'react'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import SearchImg from 'assets/search.svg'

const SearchButton = styled(Button)`
  border: 0;
  background: url("${SearchImg.src}") no-repeat center;
  background-size: 15px;
`

const Search = () => {
  const [opened, setOpened] = useState(false)

  return (
    <SearchButton />
  )
}

export default Search
