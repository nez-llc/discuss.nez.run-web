import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import Container from 'components/layout/Container'
import { useAuth } from 'auth/client'
import * as twitter from 'auth/providers/twitter/client'
import * as facebook from 'auth/providers/facebook/client'
import * as github from 'auth/providers/github/client'

const LoginButtons = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const Description = styled.div`
`

const handleSignin = () => {
  // TODO ...
  // 원래 보던 곳으로 이동
  // 원래 보던 곳 없으면 내 페이지로 이동
}

const SocialButton = styled(Button)`
`

const TwitterLoginButton = () => {
  const { signInPopup, refresh } = useAuth()

  const startLogin = async () => {
    const result = await signInPopup(twitter.getAuthorizeUrl)
    refresh()
    handleSignin(result)
  }

  return (
    <SocialButton onClick={startLogin}>트위터</SocialButton>
  )
}

const FacebookLoginButton = () => {
  const { signInPopup, refresh } = useAuth()

  const startLogin = async () => {
    const result = await signInPopup(facebook.getAuthorizeUrl)
    refresh()
    handleSignin(result)
  }

  return (
    <SocialButton onClick={startLogin}>페이스북</SocialButton>
  )
}

const GitHubLoginButton = () => {
  const { signInPopup, refresh } = useAuth()

  const startLogin = async () => {
    const result = await signInPopup(github.getAuthorizeUrl)
    refresh()
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
