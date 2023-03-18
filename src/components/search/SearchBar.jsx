import styled from '@emotion/styled'
import TextInput from 'components/ui/TextInput'

const SearchForm = styled.div`
  @media screen and (max-width: 900px) {
    display: flex;
    margin-top: 25px;
    width: 100%;
    height: 40px;
    background: #F4F6F9;
    border-radius: 25px;
    padding: 10px 20px;
  }
`

const RecentKeywords = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  
  dt {
    font-size: small;
    height: 30px;
  }
  dd{
    text-align: left;
    font-size: small;
    height: 25px;
  }
`

const SearchInput = styled(TextInput)`
  background-color: transparent;
  border: 0;
  width: 100%;
  font-size: small;
`
