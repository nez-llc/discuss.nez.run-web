import {Client} from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const getBlocksChildren = async (blocks) => await Promise.all(
  blocks.map(async (block) => await getBlockChildrenItems(block)),
)
const getBlockChildrenItems = async (block) => {
  if (block.has_children) {
    const children = await getBlocks(block.id)
    block.children_items = await getBlocksChildren(children)
  }
  return block
}
const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}

export {
  getBlocks,
  getBlocksChildren,
}