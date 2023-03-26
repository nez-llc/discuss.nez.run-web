import { buildUrl } from 'utils/url'
import { callback } from './_common'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID

export const getAuthorizeUrl = async () => (
  buildUrl('https://github.com/login/oauth/authorize', {
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: callback,
  })
)
