import Link from 'next/link'
import styled from '@emotion/styled'
import Button from 'components/ui/Button'
import { useAuth } from 'auth/use-auth'

const Wrapper = styled.div`
`

const LinkButton = Button.withComponent(Link)

const Account = () => {
  const { loggedIn, logout } = useAuth()

  return (
    <Wrapper>
      {loggedIn ? (
        <LinkButton href="/me">
          마이페이지
        </LinkButton>
      ) :(
        <LinkButton href="/signin">
          로그인
        </LinkButton>
      )}
    </Wrapper>
  )
}

export default Account
