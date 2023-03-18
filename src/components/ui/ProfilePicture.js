import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: inherit;
  height: inherit;
  margin: 0;

  img {
    border-radius: 16px;
    height: 100%;
  }
`

const ProfilePicture = ({ url }) => {
  const imgUrl = process.env.API_ENDPOINT + url
  return (
    <Wrapper>
      <img src={imgUrl} />
    </Wrapper>
  )
}

export default ProfilePicture
