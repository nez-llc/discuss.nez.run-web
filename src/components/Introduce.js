import React from 'react'
import styled from '@emotion/styled'

// const Wrapper = styled.div`
//   margin: 8px;
//   padding: 32px 8px;
//   text-align: center;
//   background: white;
//   border-radius: ${({ theme }) => theme.borderRadius};
// `

const Wrapper = styled.div`
  text-align: left;
  padding: 100px;
  border-bottom: 1px solid black;
`

const Title = styled.h1`
  font-size: 55px;
`

const Description = styled.div`
  padding: 8px 0;
  margin: 46px 0;
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
    <Title>모두를 위한 디지털 정책</Title>
    <Description>
      <p>
        기술은 우리가 살아가는 사회를 어떻게 바꾸고 있을까요.<br/> 우리가 동의하는 디지털 정책을 위해 함께 고민하고 이야기해요.
      </p>
    </Description>
    <Button>콘텐츠 읽으러가기</Button>
  </Wrapper>
)

export default Introduce
