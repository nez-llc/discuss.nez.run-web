import styled from '@emotion/styled'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

const Wrapper = styled.div`
  
`

const Main = styled.div`
  
`

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </Wrapper>
)

export default Layout
