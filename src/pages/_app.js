import React from 'react'
import Layout from 'components/layout/Layout'
import 'components/layout/reset.css'

const CustomApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default CustomApp
