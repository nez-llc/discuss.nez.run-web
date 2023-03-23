import styled from '@emotion/styled'

const Wrapper = styled.div`
  width: ${props => props.size === undefined ? '27px' : props.size.width};
  height: ${props => props.size === undefined ? '27px' : props.size.height};
  margin: 0;
  
  p, img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: #d9d9d9;
    margin: 0;
    padding: 0;
  }
`

const ProfilePicture = ({ url, size}) => {
  const imgUrl = process.env.API_ENDPOINT + url
  return (
    <Wrapper size={size}>
      {!url ? <p></p>
        : <img src={imgUrl} alt="프로필"/>}
    </Wrapper>
  )
}

export default ProfilePicture
