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
  font-size: 17px;
  padding: 10px 0;
  p {
    max-width: 460px;
    line-height: 20px;
  }
`

export default Markdown
