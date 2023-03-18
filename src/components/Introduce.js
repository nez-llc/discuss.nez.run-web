import styled from '@emotion/styled'
import Container from 'components/layout/Container'
import bg from 'assets/main_bg.png'

const Wrapper = styled.div`
  background: url(${bg.src}) no-repeat;
  background-size: cover;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  max-width: 330px;
  padding: 8px 0;
`

const Title = styled.p`
  font-size: 28px;
`

const Desc = styled.div`
  font-size: 20px;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

const Stat = styled.div`
  display: flex;
  gap: 20px;
  dl {
    width: 200px;
  }
  dt {
    color: #8FFFD0;
    font-size: 19px;
    height: 40px;
    line-height: 40px;
  }
  dd {
    color: #FFCE4F;
    font-size: 40px;
    height: 50px;
    line-height: 50px;
  }
`

const TextGroup = styled.div`
  font-weight: normal;
  font-size: 16px;
  letter-spacing: -0.03em;
  padding-top: 70px;
  
  p {
    width: 160px;
    position: relative;
  }
`

const Introduce = () => (
  <Wrapper>
    <Container>
      <Description>
        <Title>미래를 위한 디지털 정책 같이 만들어가요.</Title>
        <Desc>
          <p>기술은 우리가 살아가는 사회를 어떻게 바꾸고 있을까요.</p>
          <p>우리가 동의하는 디지털 정책을 위해 함께 고민하고 이야기해요.</p>
        </Desc>
      </Description>
      <Meta>
        <Stat>
          <dl>
            <dt>논의중인 토론</dt>
            <dd>123,321</dd>
          </dl>
          <dl>
            <dt>투표수</dt>
            <dd>132,113</dd>
          </dl>
        </Stat>
      </Meta>
    </Container>
  </Wrapper>
)

export default Introduce
