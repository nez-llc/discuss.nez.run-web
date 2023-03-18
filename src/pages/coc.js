import Container from 'components/layout/Container'
import Blocks from 'components/policy/Blocks'
import { getBlocks, getBlocksChildren } from 'utils/notion-api'

const CodeOfConductIndexPage = ({ blocks }) => (
  <Container>
    <Blocks blocks={blocks} />
  </Container>
)

export const getStaticProps = async () => {
  const blocks = await getBlocks('1cb2a3762ba44b8abae5601fe4856b02')
  await getBlocksChildren(blocks)

  return {
    props: {
      blocks,
    },
  }
}

export default CodeOfConductIndexPage
