const dns = require('dns')

dns.setDefaultResultOrder('ipv4first')

module.exports = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    SITE_URL: process.env.SITE_URL,
    FB_CLIENT_ID: process.env.FB_CLIENT_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  webpack: config => {
    const imageRule = config.module.rules.find(rule => rule.test?.test('.svg'))

    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: /inline/,
      issuer: imageRule.issuer,
      use: ['@svgr/webpack'],
    })

    config.module.rules.push({
      ...imageRule,
      test: /\.svg$/,
      resourceQuery: { not: /inline/ },
    })

    return config
  },
}
