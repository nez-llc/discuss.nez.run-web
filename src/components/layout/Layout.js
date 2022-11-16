import React from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import theme from 'components/layout/theme'

const Wrapper = styled.div`
  
`

const Main = styled.div`
  min-height: 800px;
  max-width: 740px;
  margin: 0 auto;
  padding: 16px 0;
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </Wrapper>
  </ThemeProvider>
)

export default Layout
