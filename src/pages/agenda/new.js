import React, {useState} from 'react'
import styled from '@emotion/styled'
import {useApi} from 'utils/api'
import Container from 'components/layout/Container'

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  margin: 0;
  padding: 0;
  li, p, h3 {
    margin: 0;
    padding: 0;
  }
`

const InputSection = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  input, textarea {
    width: 100%;
    padding: 12px 24px;
    background: #FFFFFF;
    border: 1px solid #EBEEF2;
    border-radius: 16px;
  }
`

const AddInputForm = styled(Wrapper)`
`

const SubInputSection = styled(InputSection)`
  flex-direction: row;
`

const Label = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: #2C3A4B;
  opacity: 0.8;
  
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: #DA1414;
  }
`

const Input = styled.input`
  height: 48px;
`

const Textarea = styled.textarea`
  height: 143px;
`

const TextLength = styled(Label)`
  margin-left: auto !important;
`

const SubmitButton = styled.button`
  padding: 14px 18px;
  width: 216px;
  height: 55px;
  background: rgba(47, 128, 237, 0.4);
  border-radius: 32px;
  border: 0;
  
  margin: 0 auto;

  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #FFFFFF;
`

const NewAgendaPage = () => {
  const { client } = useApi()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [desc, setDesc] = useState('')
  const [picture, setPicture] = useState()
  const [pictureImg, setPictureImg] = useState('')
  const [textLength, setTextLength] = useState(0)

  const textareaOnChange = (e, limit) => {
    const text = e.target.value
    const len = text.length
    if(len > limit) {
      alert(`제한 글자수를 초과하였습니다. (${limit}자)`)
      return false
    }
    setTextLength(len)
    setDesc(text)
  }
  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  const onSaved = () => {
    alert('질문이 등록되었습니다.')
    setDesc('')
    setSummary('')
    setTitle('')
    setPicture('')
  }

  const onLoadFile = async (e) => {
    setPicture(e.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setPictureImg(reader.result)
    }
  }

  const saveAgenda = async () => {
    const { code, data } = await client.filePostUrl('/api/agendas/', picture, {
      title,
      summary,
      desc,
      tags: [],
    })

    switch (code) {
      case 201: onSaved(); break
        // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
    }
  }
  return (
    <Container>
      <Wrapper>
        <h3>토론 작성하기</h3>
        <InputSection>
          <Label>제목<span>&#42;</span></Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </InputSection>
        <InputSection>
          <Label>요약<span>&#42;</span></Label>
          <Input
            value={summary}
            onChange={e => setSummary(e.target.value)}
          />
        </InputSection>
        <InputSection>
          <Label>내용<span>&#42;</span></Label>
          <Textarea
            value={desc}
            onChange={e => textareaOnChange(e, 560)}
          />
          <TextLength>{textLength} / 560</TextLength>
        </InputSection>
        <InputSection>
          <Label>Tags<span>&#42;</span></Label>
          <Input />
        </InputSection>
        <InputSection>
          <Label>관련 기사<button>추가</button></Label>
          <Label>제목</Label>
          <Input />
          <Label>링크</Label>
          <Input />
          <button>삭제</button>
        </InputSection>
        <InputSection>
          <Label>관련 정책<button>추가</button></Label>
          <Label>제목</Label>
          <Input />
          <Label>링크</Label>
          <Input />
          <button>삭제</button>
        </InputSection>
        {/* <InputSection> */}
        {/*   <p>아젠다 이미지</p> */}
        {/*   { pictureImg ? <img src={pictureImg} alt="아젠다 이미지" /> : <></> } */}
        {/*   <input type="file" onChange={onLoadFile} style={{display: 'block'}}/> */}
        {/* </InputSection> */}
        <InputSection>
          <SubmitButton onClick={saveAgenda}>발행하기</SubmitButton>
        </InputSection>
      </Wrapper>
    </Container>
  )
}

export default NewAgendaPage
