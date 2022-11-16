import styled from '@emotion/styled'

const Pane = styled.div`
  margin: 8px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow}
`

const Title = styled.h3`
  margin-bottom: 16px;
`

Pane.Title = Title

export default Pane
