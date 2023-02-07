import React from 'react'
import styled from '@emotion/styled'

const AgendaMeta = styled.div`
  width: 100%;
  height: 30px;
  
  span{
    display: inline-block;
    padding-left: 15px;
    font-size: small;
    line-height: 25px;
    float: right;
  }
`
const AgendaMetaData = () => {
  return (
    <AgendaMeta>
      {/* <span>조회수 132</span> */}
      {/* <span>댓글 32</span> */}
      <span>스크랩</span>
      <span>공유</span>
    </AgendaMeta>
  )
}

export default AgendaMetaData