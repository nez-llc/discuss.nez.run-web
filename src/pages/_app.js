import React from 'react'
import Layout from 'components/layout/Layout'
import { UserProvider } from 'auth/use-auth'
import 'components/layout/reset.css'

const CustomApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </UserProvider>
)

export default CustomApp
