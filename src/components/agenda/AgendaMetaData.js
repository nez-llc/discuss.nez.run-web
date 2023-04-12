import styled from '@emotion/styled'
import Image from 'next/image'
import View from 'assets/icons/view.svg'
import Comment from 'assets/icons/comment.svg'
import Bookmark from 'assets/icons/bookmark.svg'
import Share from 'assets/icons/share.svg'


const AgendaMeta = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  font-weight: 400;
  font-size: 14px;

  color: #000000;
`

const ActionButtons = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  width: 44px;
  height: 44px;
  background: rgba(0, 136, 255, 0.1);
  box-shadow: 0 0 50px rgba(90, 108, 234, 0.08);
  border-radius: 12px;
  
  border: 0;
`

const AgendaMetaData = () => {
  return (
    <AgendaMeta>
      <Image src={View} alt="조회수" />999
      <Image src={Comment} alt="댓글" />999
      <ActionButtons>
        <Button><Image src={Bookmark} alt="북마크 "/></Button>
        <Button><Image src={Share} alt="공유" /></Button>
      </ActionButtons>
    </AgendaMeta>
  )
}

export default AgendaMetaData
