import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'

// const Markdown = ({ ...props}) => {
//   return (
//     <ReactMarkdown
//       css={{
//         maxWidth: '460px',
//         p: {
//           padding: '6px 0',
//           lineHeight: '1.4',
//         }
//       }}
//     >
//       {question.desc}
//     </ReactMarkdown>
//   )
// }

const Markdown = styled(ReactMarkdown)`
  p {
    max-width: 460px;
    padding: 6px 0;
    line-height: 1.4;
  }
`

export default Markdown
