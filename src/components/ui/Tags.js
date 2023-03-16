import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Ul = styled.ul`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  a{
    text-decoration: none;
  }
`

const Li = styled.li`
  ${props => props.view === 'list' ? `
      text-decoration-line: underline;
      color: #828282;
      font-size: 12px;
    `
    : `
      padding: 4px 12px;
      height: 29px;
      border: 2px solid #2F80ED;
      color: #2F80ED;
      border-radius: 24px;
      font-size: 14px;
  `};
`

const Tags = ({ tags, view }) => {
  const router = useRouter()

  return (
    <Ul>
      {tags && tags.map((tag) => (
        <Li key={tag.id} view={view}>
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
