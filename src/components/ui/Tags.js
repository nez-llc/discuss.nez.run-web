import styled from '@emotion/styled'
import Link from 'next/link'

const Ul = styled.ul`
  display: flex;
  padding: 10px 0;
  
  ${({ view }) => view === 'nav' ? `
  gap: 15px 5px;
    flex-wrap: wrap;
  `
    : `
    overflow-x: scroll;
    gap: 10px;
  `}

  a {
    text-decoration: none;
    flex: 0 0 auto;
    white-space: nowrap;
  }
`

const Tag = styled.span`
  ${({ view }) => view === 'list' ? `
    font-size: 15px;
    line-height: 125%;
    text-decoration-line: underline;
    color: #828282;`
    :
    `padding: 4px 12px;
    height: 29px;
    border: 2px solid #2F80ED;
    color: #2F80ED;
    border-radius: 24px;
    font-size: 14px;`
}
  
`

const Tags = ({ tags, view }) => (
  <Ul view={view}>
    {JSON.stringify(tags) !== '{}' && tags.map(tag => (
      <li key={tag.id}>
        <Link href={`/agenda?tag=${tag.name}`}>
          <Tag view={view}>{tag.name}</Tag>
        </Link>
      </li>
    ))}
  </Ul>
)

export default Tags
