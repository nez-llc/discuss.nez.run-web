import React from 'react'
import styled from '@emotion/styled'


const Wrapper = styled.div`
  padding: 16px 0;
`

const Block = styled.div`
  counter-reset: section;
  p::before{
    counter-increment: section;
    content: counter(section) ". ";
  }
`

const NumberedListItem = styled.p`
  margin-bottom: 3px;
  ul {
    counter-reset: section2;
  }
  ul > p::before{
    counter-increment: section2;
    content: counter(section2, lower-alpha) ". ";
  }
`
const ChildrenItem = styled.ul`
    padding-left: 1em;
`

const RichText = ({ item }) => {
    //console.log(item);
    const annotations = item.annotations;
    return (
        <span key={item.id} style={{
            fontWeight: (annotations.bold ? 'bold' : ''),
            fontStyle: (annotations.italic ? 'italic' : ''),
            textDecoration: (annotations.strikethrough ? 'line-through' : ''),
            color: (annotations.color)
        }}>
            {item && item.text.content}
        </span>
    )
}

const BlockHeading1 = ({ block }) => {
    return (
        <Block>
            <h1>
                {block[block.type].rich_text.map(item => (
                    <RichText  key={block.id} item={item}/>
                ))}
            </h1>
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </Block>
    )
}
const BlockNumberedListItem = ({ block }) => {
    return (
        <NumberedListItem>
            {block[block.type].rich_text.map(item => (
                <RichText item={item}/>
            ))}
            <div>
                {block.has_children && <ChildrenItems children={block.children_items} /> }
            </div>
        </NumberedListItem>
    )
}
const BlockDefaultItem = ({ block }) =>{
    //console.log(block);
    return(
        <Block>
            {block[block.type].rich_text.map(item => (
                <RichText key={item.id} item={item}/>
            ))}
            {block.has_children && <ChildrenItems children={block.children_items} /> }
        </Block>
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
                    <SwitchRichText block={block} />
            ))}
        </Wrapper>
    )
}

export default Blocks
