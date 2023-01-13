import React, {useState} from 'react'
import styled from "@emotion/styled";
import {useApi} from "utils/api";

const Title = styled.p`
`
const Input = styled.input`
  display: inline-block;
  width: 100%
`

const Textarea = styled.textarea`
  flex-shrink: 1;
  width: 100%;
  height: 500px;
`

const SubmitButton = styled.button`
  
`

const NewAgendaPage = () => {
    const { client } = useApi()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [desc, setDesc] = useState('')
    const [picture, setPicture] = useState()
    const [pictureImg, setPictureImg] = useState('')

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
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setPictureImg(reader.result);
        };
    }

    const saveAgenda = async () => {
        const { code, data } = await client.filePostUrl(`/api/agendas/`, picture, {
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
    <div>
      <div>
        <Title>제목</Title>
        <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
      </div>
      <p>요약</p>
      <Input
          value={summary}
          onChange={e => setSummary(e.target.value)}
      />
      <p>내용</p>
      <Textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
      />
      <p>아젠다 이미지</p>
        {
          pictureImg ? <img src={pictureImg} alt="아젠다 이미지" /> : <></>
        }
      <input type="file" onChange={onLoadFile} style={{display: 'block'}}/>
      <SubmitButton onClick={saveAgenda}>등록</SubmitButton>
    </div>
  )
}

export default NewAgendaPage
