import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NOTION_API_KEY

const notion = new Client({
  auth: NOTION_API_KEY,
})

const getBlocks = async blockId => {
  const { results } = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })

  return Promise.all(
    results.map(async block => {
      if (block.has_children) {
        block.children_items = await getBlocks(block.id)
      }
      return block
    })
  )
}

export {
  getBlocks,
}
