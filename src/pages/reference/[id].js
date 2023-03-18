import Container from 'components/layout/Container'
import styled from '@emotion/styled'

const Contents = styled.div`
  max-width: 100%;
  min-height: 300px;
`

const ReferencePage = () => (
  <Container>
    <h1>정책 참고자료</h1>
    <p>최근 업데이트: 2021-12-12</p>
    <hr />
    <Contents>
      <p>
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
        정책 설명 정책 설명
      </p>
    </Contents>
    <hr />
    <div>
      <a href={'ddd'}>수정 제안</a>
    </div>
  </Container>
)

export default ReferencePage
