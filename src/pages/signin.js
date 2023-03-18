import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import Container from 'components/layout/Container'
import TwitterProvider from 'auth/providers/twitter'
import FacebookProvider from 'auth/providers/facebook'
import GitHubProvider from 'auth/providers/github'
import { useAuth } from 'auth/use-auth'

const handleSignin = () => {
  // TODO ...
  // 원래 보던 곳으로 이동
  // 원래 보던 곳 없으면 내 페이지로 이동
}

const SocialButton = styled(Button)`
`

const TwitterLoginButton = () => {
  const { signInPopup } = useAuth()

  const start = async () => {
    const result = await signInPopup(TwitterProvider)
    handleSignin(result)
  }

  return (
    <SocialButton onClick={start}>트위터</SocialButton>
  )
}

const FacebookLoginButton = () => {
  const { signInPopup } = useAuth()

  const startLogin = async () => {
    const result = await signInPopup(FacebookProvider)
    handleSignin(result)
  }

  return (
    <SocialButton onClick={startLogin}>페이스북</SocialButton>
  )
}

const GitHubLoginButton = () => {
  const { signInPopup } = useAuth()

  const startLogin = async () => {
    const result = await signInPopup(GitHubProvider)
    handleSignin(result)
  }

  return (
    <SocialButton onClick={startLogin}>GitHub</SocialButton>
  )
}

const Ul = styled.ul`
`

const Signin = () => (
  <Container>
    <Ul>
      <li>
        <TwitterLoginButton />
      </li>
      <li>
        <FacebookLoginButton />
      </li>
      <li>
        <GitHubLoginButton />
      </li>
    </Ul>
  </Container>
)

export default Signin
