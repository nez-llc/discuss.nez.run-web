import { providers } from 'auth/server'

export default async function handler (req, res) {
  const { provider: providerId } = req.body

  const provider = providers[providerId]
  const tokens = await provider.getOAuthToken()

  return res.json(tokens)
}
