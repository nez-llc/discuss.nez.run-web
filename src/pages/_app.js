import Layout from 'components/layout/Layout'
import { UserProvider } from 'auth/use-auth'
import 'modern-normalize/modern-normalize.css'
import './_global.scss'

const CustomApp = ({ Component, pageProps }) => (
  <UserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </UserProvider>
)

export default CustomApp
