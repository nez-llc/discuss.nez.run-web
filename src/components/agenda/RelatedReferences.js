import styled from '@emotion/styled'

const Wrapper = styled.ul`
  padding-left: 15px;
  margin: 0;
  margin-top: 15px;
  display: grid;
  gap: 5px;
  
  li{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    list-style-type: disc;
    color: #4D4D4D;
  }
  
  a{
    text-decoration: none;
  }
`

const RelatedReferences = () => (
  <Wrapper>
    <li>
      <a href="#_">공인인증서가 공동인증서로 바뀌었습니다</a>
    </li>
    <li>
      <a href="#_">2천만명의 처방 받은 약품 정보가 해외 업체에 판매 되었습니다</a>
    </li>
    <li>
      <a href="#_">출입국 심사시에 찍었던 사진을 민간 기업에 제공하였습니다</a>
    </li>
    <li>
      <a href="#_">영국 정부 gov.uk의 가이드라인</a>
    </li>
  </Wrapper>
)

export default RelatedReferences
