import React from 'react'
import styled from '@emotion/styled'

const Wrapper = styled.ul`
  padding: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
`

const Item = styled.li`
  border: 1px solid black;
  padding: 8px;
`

const Pagination = () => (
  <Wrapper>
    <Item>1</Item>
    <Item>2</Item>
    <Item>3</Item>
  </Wrapper>
)

export default Pagination
