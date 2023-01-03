import React from 'react'
import { getBlocks, getBlocksChildren } from 'utils/notion-api';
import styled from "@emotion/styled";
import Blocks from 'components/policy/Blocks'


const ServiceIndexPage = (props) => {
    return (
        <Blocks blocks={props.blocks} />
    );
}

export const getStaticProps = async () => {
    const blocks = await getBlocks('960af32f83984d419bfb0bc3c92e5528');

    // for (const block of blocks){
    //     if (block.has_children){
    //         blocks.children_items = getBlocks(block.id);
    //     }
    // }
    //
    // for (const block of blocks){
    //     if (block.has_children){
    //         blocks.children_items = await blocks.children_items;
    //     }
    // }

    // const result = await Promise.all(
    //     blocks.map(async block => {
    //         if(block.has_children) {
    //             block.children_items = await getBlocks(block.id);
    //         }
    //         return block;
    //     })
    // );
    await getBlocksChildren(blocks);

    return {
        props: {
            // blocks: blocks,
            blocks: blocks,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1, // In seconds
    };
};

export default ServiceIndexPage
