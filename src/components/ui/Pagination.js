import React from 'react'
import styled from '@emotion/styled'
import vector from 'assets/vector.png'

const Wrapper = styled.ul`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  li {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 150%;
    color: #2281F5;
  }
`

const Pagination = (total, per_page, onChangePerPage) => {
  return (
    <Wrapper>
      <li onClick={() => onChangePerPage(3)}>더보기</li>
      <li><img src={vector.src} /></li>
    </Wrapper>
  )
}

export default Pagination
