import React from 'react'
import styled from '@emotion/styled'
import uuid from 'react-uuid'

const Wrapper = styled.div`
  padding: 16px 0;
`

const Block = styled.div`
  margin-bottom: 10px;

  > div > div {
    counter-reset: section;
  }

  > div > div ol {
    padding-left: 1em;
    text-indent: -1em;
  }

  > div > div > ol > li::before{
    counter-increment: section;
    content: counter(section) ". ";
  }
  
  > div > div > ul {
    padding-left: 1em;
    list-style-type: disc;
  }

  > div > div > ol {
    counter-reset: section2;
  }

  ol ol > li::before {
    counter-increment: section2;
    content: counter(section2, lower-alpha) ". ";
  }
`

const TableRow = styled.table`
  width: 100%;
  border: 1px solid rgb(233, 233, 231);
  border-collapse: collapse;
  th{
    background: rgb(247, 246, 243);
  }
  th, td{
    border: 1px solid rgb(233, 233, 231);
  }
`

const RichText = ({item}) => {
  const annotations = item.annotations

  return (
    <span style={{
      fontWeight: (annotations.bold ? 'bold' : 'normal'),
      fontStyle: (annotations.italic ? 'italic' : 'normal'),
      textDecoration: (annotations.strikethrough ? 'line-through' : 'none'),
      color: (annotations.color),
    }}>
      {item.text.link ?
        <a href={item.text.link.url}>{item.text.content}</a> : item.text.content}
    </span>
  )
}

const BlockHeading1 = ({block}) => (
  <>
    <h1>
      {block[block.type].rich_text.map(item => (
        <RichText key={uuid()} item={item}/>
      ))}
    </h1>
    {block.has_children && <ChildrenItems childrenItems={block.children_items}/>}
  </>
)

const BlockHeading2 = ({block}) => (
  <>
    <h2>
      {block[block.type].rich_text.map(item => (
        <RichText key={uuid()} item={item}/>
      ))}
    </h2>
    {block.has_children && <ChildrenItems childrenItems={block.children_items}/>}
  </>
)

const BlockNumberedListItem = ({block}) => (
  <ol>
    <li>
      {block[block.type].rich_text.map(item => (
        <RichText key={uuid()} item={item}/>
      ))}
    </li>
    {block.has_children && <ChildrenItems childrenItems={block.children_items}/>}
  </ol>
)

const BlockBulletedList = ({block}) => (
  <ul>
    <li>
      {block[block.type].rich_text.map(item => (
        <RichText key={uuid()} item={item}/>
      ))}
    </li>
    {block.has_children && <ChildrenItems childrenItems={block.children_items}/>}
  </ul>
)


const BlockTableRow = ({block}) => (
  <TableRow>
    {block.children_items?.map((item, index) => (
      <>
        {block.table.has_column_header && index == 0 ?
          <thead key={item.id}>
            <tr>
              {item.table_row.cells?.map(row => (
                <th key={uuid()}>
                  {row.map(cell => (
                    <RichText key={uuid()} item={cell}/>
                  ))}
                </th>
              ))}
            </tr>
          </thead>
          :
          <tbody key={item.id}>
            <tr>
              {item.table_row.cells?.map(row => (
                <td key={uuid()}>
                  {row.map(cell => (
                    <RichText key={uuid()} item={cell}/>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        }
      </>
    ))}
  </TableRow>
)

const BlockDefaultItem = ({block}) => (
  <div>
    {block[block.type].rich_text.map(item => (
      <RichText key={uuid()} item={item}/>
    ))}
    {block.has_children && <ChildrenItems childrenItems={block.children_items}/>}
  </div>
)

const SwitchRichText = ({block}) => (
  <>
    {block?.type == 'heading_1' ?
      <BlockHeading1 block={block}/>
      : block?.type == 'heading_2' ?
        <BlockHeading2 block={block}/>
        : block?.type == 'numbered_list_item' ?
          <BlockNumberedListItem block={block}/>
          : block?.type == 'table' ?
            <BlockTableRow block={block}/>
            : block?.type == 'bulleted_list_item' ?
              <BlockBulletedList block={block}/>
              :
              <BlockDefaultItem block={block}/>
    }
  </>
)

const ChildrenItems = ({childrenItems}) => (
  <div>
    {childrenItems?.map(block => (
      <SwitchRichText key={block.id} block={block}/>
    ))}
  </div>
)

const Blocks = ({blocks}) => {
  blocks = blocks.filter(block =>
    (block[block.type].rich_text?.length > 0) || block.type == 'table'
  )

  return (
    <Wrapper>
      {blocks?.map(block => (
        <Block key={block.id}>
          <SwitchRichText block={block}/>
        </Block>
      ))}
    </Wrapper>
  )
}

export default Blocks
