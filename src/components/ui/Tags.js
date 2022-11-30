import React from 'react'
import styled from '@emotion/styled'

const Ul = styled.ul`
  display: flex;
  gap: 8px;
  //justify-content: flex-end;
`

const Li = styled.li`
  
`

const Tag = styled.span`
  background: #ececec;
  border-radius: 5px;
  padding: 2px 12px 4px;
  opacity: 0.8;
`

const Tags = ({ tags }) => (
  <Ul>
    {tags && tags.map(tag => (
      <Li key={tag.id}>
        <Tag>{tag.name}</Tag>
      </Li>
    ))}
  </Ul>
)

export default Tags
