import React from 'react'
import styled from '@emotion/styled'
import Comment from 'components/comment/Comment'

const Ul = styled.ul`
`

const Li = styled.li`
  margin-bottom: 24px;
`

const CommentColumn = styled.div`
  font-size: 15px;
  
  button{
    width: 50%;
    height: 30px;
    border-radius: 0;
    border: 0;
  }
  button:nth-child(1){
    background-color: #B9A7A7;
  }
  button:nth-child(2){
    background-color: #EFEFEF;
  }
`

const CommentNavBar = styled.div`
  font-size: 13px;
  height: 40px;
  line-height: 40px;
  padding: 0px 20px;
  border-bottom: 1px solid #F5F5F5;
  select{
    font-size: 12px;
    border: 0;
  }
  span{
    display: inline-block;
    float: right;
  }
`

const CommentList = ({ agendaId, comments, onDeleted }) => (
  <div>
    <CommentColumn>
      <button>찬성의견 3</button>
      <button>반대의견 2</button>
    </CommentColumn>
    <CommentNavBar>
      <select>
        <option>시간순</option>
        <option>공감순</option>
      </select>
      <span>마지막 댓글로 이동</span>
    </CommentNavBar>
    <Ul>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} refresh={onDeleted} agendaId={agendaId}/>
      ))}
    </Ul>
  </div>
)

export default CommentList
