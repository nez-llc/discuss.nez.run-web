import React from 'react'
import { getBlocks, getBlocksChildren } from 'utils/notion-api';
import Blocks from 'components/policy/Blocks'


const PrivacyIndexPage = (props) => {
    return (
        <Blocks blocks={props.blocks} />
    );
}

export const getStaticProps = async () => {
    const blocks = await getBlocks('84d1bcb7289349679e7a530168ab19f3');

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

export default PrivacyIndexPage
