import styled from '@emotion/styled'
import { css } from '@emotion/react'
import React from 'react'

const VOTE_COLORS = ['#6092c0', '#f1ebd7', '#e7664c']

const Wrapper = styled.div`
  //display: grid;
  //grid-template-columns: 1fr auto 1fr;
  //display: flex;
  position: relative;
  align-items: center;
`

const Button = styled.button`
  //display: block;
  display: none;
  //width: 40px;
  height: 36px;
  border-radius: 10px;
  top: -6px;
  font-size: 14px;
  font-weight: bold;
  background: white;
  border: 1px solid #949494;
  position: absolute;
  width: 56px;
`

const Outer = styled.div`
  height: 16px;
  display: flex;
  width: 100%;
`

const Inner = styled.div`
  height: 100%;
`

const VoteBar = ({  }) => {
  const votes = [123, 12,  123]
  // const sum = votes.reduce((a, b) => a + b, 0)

  return (
    <Wrapper>
      <Button style={{ left: '-6px', color: VOTE_COLORS[0] }}>
        동의
      </Button>
      <Outer>
        {votes.map((votes, i) => (
          <Inner
            style={{
              width: `${votes / 0.3 * 100}%`,
              background: VOTE_COLORS[i],
            }}
          />
        ))}
      </Outer>
      <Button style={{ right: '-6px', color: VOTE_COLORS[2] }}>
        비동의
      </Button>
    </Wrapper>
  )
}

export default VoteBar
