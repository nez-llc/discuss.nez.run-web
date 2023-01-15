import React from 'react'
import { getBlocks, getBlocksChildren } from 'utils/notion-api'
import Blocks from 'components/policy/Blocks'

const TermsIndexPage = (props) => (
  <Blocks blocks={props.blocks} />
)

export const getStaticProps = async () => {
  const blocks = await getBlocks(process.env.NOTION_API_POLICY_TERMS_ID)
  await getBlocksChildren(blocks)

  return {
    props: {
      blocks: blocks,
    },
    revalidate: 1,
  }
}

export default TermsIndexPage
