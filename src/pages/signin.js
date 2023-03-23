import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import Container from 'components/layout/Container'
import TwitterProvider from 'auth/providers/twitter'
import FacebookProvider from 'auth/providers/facebook'
import GitHubProvider from 'auth/providers/github'
import { useAuth } from 'auth/use-auth'

const Description = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  margin: 0;
  padding: 0;
`

const LoginButtons = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`

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

const Signin = () => (
  <Container>
    <Description>
      <li>
        <h1>우리가 동의하는</h1>
        <h1>디지털 정책</h1>
      </li>
      <li>
        <h3>미래를 위한 디지털 정책</h3>
        <h3>같이 만들어가요</h3>
      </li>
    </Description>
    <Description>
      <li>
        <h5>소셜미디어로 3초만에 시작하기!</h5>
      </li>
    </Description>
    <LoginButtons>
      <li>
        <TwitterLoginButton />
      </li>
      <li>
        <FacebookLoginButton />
      </li>
      <li>
        <GitHubLoginButton />
      </li>
    </LoginButtons>
  </Container>
)

export default Signin
