import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Ul = styled.ul`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  a {
    text-decoration: none;
  }
`

const Tag = styled.span`
  padding: 4px 12px;
  height: 29px;
  border: 2px solid #2F80ED;
  color: #2F80ED;
  border-radius: 24px;
  font-size: 14px;
`

const Tags = ({ tags }) => (
  <Ul>
    {tags && tags.map(tag => (
      <li key={tag.id}>
        <Link href={`/agenda?tag=${tag.name}`}>
          <Tag>{tag.name}</Tag>
        </Link>
      </li>
    ))}
  </Ul>
)

export default Tags
