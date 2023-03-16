import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Ul = styled.ul`
  padding-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  //justify-content: flex-end;
  //margin-bottom: 15px;
  a{
    text-decoration: none;
  }
`

const Li = styled.li`
  font-size: small;
  padding: 4px 12px;
  height: 29px;
  border: 2px solid #2F80ED;
  color: #2F80ED;
  border-radius: 24px;
`

const Tags = ({ tags }) => {
  const router = useRouter()
  return (
    <Ul>
      {tags && tags.map((tag, index) => (
        <Li key={tag.id}>
          <Link href={{
            pathname: router.pathname,
            query: { ...router.query, tag: tag.name },
          }}>
            {tag.name}
          </Link>
        </Li>
      ))}
    </Ul>
  )
}

export default Tags
