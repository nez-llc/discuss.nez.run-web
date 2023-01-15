import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {useRouter} from "next/router";

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

const Tags = ({ tags }) => {

  const router = useRouter();
  return (
    <Ul>
      {tags && tags.map(tag => (
        <Li key={tag.id}>
          <Link href={{
            pathname: router.pathname,
            query: { ...router.query, tag: tag.name },
          }}>
            <Tag>{tag.name}</Tag>
          </Link>
        </Li>
      ))}
    </Ul>
  )
}

export default Tags
