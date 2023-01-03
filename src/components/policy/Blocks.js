import React from 'react'
import styled from '@emotion/styled'


const Wrapper = styled.div`
  padding: 16px 0;
`

const Block = styled.div`
    margin-bottom: 10px;
    counter-reset: section;
    p::before{
        counter-increment: section;
        content: counter(section) ". ";
    }
  
    p > div {
      counter-reset: section2;
    }
    p > div p::before{
        counter-increment: section2;
        content: counter(section2, lower-alpha) ". ";
    }
`

const NumberedListItem = styled.p`
    margin-bottom: 3px;
    //> div {
    //counter-reset: section2;
    //}
    //div > div > p::before{
    //counter-increment: section2;
    //content: counter(section2, lower-alpha) ". ";
    //}
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
            {item.text.content}
        </span>
    )
}

const BlockHeading1 = ({ block }) => {
    return (
        <>
            <h1>
                {block[block.type].rich_text.map(item => (
                    <RichText item={item}/>
                ))}
            </h1>
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </>
    )
}
const BlockNumberedListItem = ({ block }) => {
    return (
        <NumberedListItem>
            {block[block.type].rich_text.map(item => (
                <RichText item={item}/>
            ))}
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </NumberedListItem>
    )
}
const BlockDefaultItem = ({ block }) =>{
    return(
        <>
            {block[block.type].rich_text.map(item => (
                <RichText item={item}/>
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
                    <SwitchRichText block={block} />
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
                <Block>
                    <SwitchRichText block={block} />
                </Block>
            ))}
        </Wrapper>
    )
}

export default Blocks
