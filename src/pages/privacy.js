import Container from 'components/layout/Container'
import Blocks from 'components/policy/Blocks'
import { getBlocks } from 'utils/notion-api'

const PrivacyIndexPage = ({ blocks }) => (
  <Container>
    <Blocks blocks={blocks} />
  </Container>
)

export const getStaticProps = async () => {
  const blocks = await getBlocks('ece19c3efec24e6a935f69adfede199a')

  return {
    props: {
      blocks,
    },
  }
}

export default PrivacyIndexPage
