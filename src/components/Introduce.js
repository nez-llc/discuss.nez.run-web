import React from 'react'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'

// const Wrapper = styled.div`
//   margin: 8px;
//   padding: 32px 8px;
//   text-align: center;
//   background: white;
//   border-radius: ${({ theme }) => theme.borderRadius};
// `

const Wrapper = styled(Pane)`
  text-align: center;
`

const Title = styled.h1`
  font-size: 32px;
  padding: 8px;
`

const Description = styled.div`
  padding: 8px 0;
`

const Introduce = () => (
  <Wrapper>
    <Title>우리가 동의하는 IT정책은?</Title>
    <Description>
      <p>
        데이터 댐에서 부터 디지털 플랫폼 정부까지, <br/> 디지털 정책을 모아봤습니다. 어떻게 생각하시나요?
      </p>
    </Description>
  </Wrapper>
)

export default Introduce
