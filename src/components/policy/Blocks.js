import React from 'react'
import styled from '@emotion/styled'
import Link from "next/link";


const Wrapper = styled.div`
  padding: 16px 0;
`

const Block = styled.div`
    margin-bottom: 10px;
    > div {
      counter-reset: section;  
    }
    
    > div > ul > li::before{
        counter-increment: section;
        content: counter(section) ". ";
    }
  
    > div > ul {
      counter-reset: section2;
    }
    ul ul > li::before{
        counter-increment: section2;
        content: counter(section2, lower-alpha) ". ";
    }
`

const NumberedListItem = styled.ul`
    margin-bottom: 3px;
`
const ChildrenItem = styled.div`
    padding-left: 1em;
`

const RichText = ({ item }) => {
    const annotations = item.annotations;
    return (
        <span style={{
            fontWeight: (annotations.bold ? 'bold' : ''),
            fontStyle: (annotations.italic ? 'italic' : ''),
            textDecoration: (annotations.strikethrough ? 'line-through' : ''),
            color: (annotations.color)
        }}>
            {item.text.link ?
                <Link href={item.text.link.url}><a>{item.text.content}</a></Link> : item.text.content}
        </span>
    )
}

const BlockHeading1 = ({ block }) => {
    return (
        <>
            <h1>
                {block[block.type].rich_text.map((item, index) => (
                    <RichText key={block.id + '_'    + index} item={item}/>
                    //<div key={item.id}>{item.text.content}</div>
                ))}
            </h1>
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </>
    )
}
const BlockNumberedListItem = ({ block }) => {
    return (
        <NumberedListItem>
            {block[block.type].rich_text.map((item, index) => (
                <li key={block.id + '_'    + index}>
                    <RichText item={item}/>
                </li>
            ))}
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </NumberedListItem>
    )
}
const BlockDefaultItem = ({ block }) =>{
    return(
        <>
            {block[block.type].rich_text.map((item, index) => (
                <RichText key={block.id + '_' + index} item={item}/>
            ))}
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </>
    )
}
const SwitchRichText = ({ block }) => {
    return (
        <>
            {block
                && block.type == 'heading_1' ?
                    <BlockHeading1 block={block} />
                : block.type == 'numbered_list_item' ?
                    <BlockNumberedListItem block={block} />
                :
                    <BlockDefaultItem block={block} />
            }
        </>

    )
}

const ChildrenItems = ({ children }) => {
    children = children.filter(block => {
        return block[block.type].rich_text.length > 0;
    });

    return(
        <ChildrenItem>
            {children &&
                children.map(block => (
                    <SwitchRichText key={block.id} block={block} />
                ))
            }
        </ChildrenItem>
    )
}
const Blocks = ({ blocks }) => {
    blocks = blocks.filter(block => {
       return block[block.type].rich_text.length > 0;
    });

    return (
        <Wrapper>
            {blocks && blocks.map(block => (
                <Block key={block.id}>
                    <SwitchRichText block={block} />
                </Block>
            ))}
        </Wrapper>
    )
}

export default Blocks
