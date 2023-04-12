import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'

const Markdown = styled(ReactMarkdown)`
  //padding: 10px 0;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #000000;

  p {
    font-size: 16px;
    line-height: 20px;
  }
`

export default Markdown
