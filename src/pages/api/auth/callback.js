import providers from 'auth/providers'
import {client} from 'utils/api'

const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <title>인증완료</title>
  <meta name=viewport content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
  <script type="text/javascript">
    window.close()
  </script>
</body>
</html>
`

const setCookie = (res, name, value) => {
  res.setHeader('Set-Cookie', `${name}=${value}; Path=/`)
}

const exchangeToken = async (provider, tokens) => {
  console.log({
    provider,
    tokens,
  })

  const { data } = await client.post('/api/auth/token', {
    provider,
    tokens,
  })

  return {
    data,
  }
}

export default async function handler (req, res) {
  const { provider: providerId } = req.query

  const provider = providers[providerId]

  console.log(providerId)
  console.log(provider)

  const providerTokens = await provider.getAccessToken(req.query)
  const apiToken = await exchangeToken(providerId, providerTokens)

  setCookie(res, 'auth', apiToken.data.token)

  res.send(html)
}
