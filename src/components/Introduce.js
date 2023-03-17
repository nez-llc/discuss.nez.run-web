import React from 'react'
import styled from '@emotion/styled'
import MainBg from 'assets/main_bg.png'

const Wrapper = styled.div`
  display: flex;
  gap: 150px;
  
  color: #fff;
  text-align: left;
  font-weight: bold;
  padding: 100px 40px;
  border-bottom: 1px solid black;
  background: url("${MainBg.src}") no-repeat center;
  margin-top: -92px;
  
  @media screen and (max-width: 900px) {
    padding: 100px 30px;
    margin-top: -86px;
    background-size: cover;
    
    flex-direction: column;
    gap: 50px;
  }
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

  @media screen and (max-width: 900px) {
    font-size: 18px;
  }
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

  @media screen and (max-width: 900px) {
    dl {
      width: 150px;
    }
    dd {
      font-size: 35px;
    }
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
  
  p:nth-of-type(2){
    width: 100px;
    left: 70%;
  }
  p:nth-of-type(3){
    top: 10px;
    left: 30%;
  }
`

const Button = styled.button`
  padding: 8px 48px;
  border-radius: 50px;
  background-color: black;
  color: white;
  cursor: pointer;
`

const Introduce = () => (
  <Wrapper>
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
      <TextGroup>
        <p>“ 개인정보를 국가가 판매하는건  합법인가? ”</p>
        <p>“ 인공지능이</p>
        <p>“ 죽은 사람의 데이터는 어떻게 될까? ”</p>
      </TextGroup>
    </Meta>
    {/* <Button>콘텐츠 읽으러가기</Button> */}
  </Wrapper>
)

export default Introduce
