import Container from 'components/layout/Container'
import Blocks from 'components/policy/Blocks'
import { getBlocks } from 'utils/notion-api'

const TermsIndexPage = ({ blocks }) => (
  <Container>
    <Blocks blocks={blocks} />
  </Container>
)

export const getStaticProps = async () => {
  const blocks = await getBlocks('61624b21171142819e96f459e510fb52')

  return {
    props: {
      blocks,
    },
  }
}

export default TermsIndexPage
