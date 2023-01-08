import {useApi} from "utils/api";
import {useAuth} from "auth/use-auth";
import {useState} from "react";
import styled from "@emotion/styled";

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`

const Me = () => {
    const { client } = useApi()
    const { token, user, refreshUser } = useAuth()
    const [nickname, setNickname] = useState(user.nickname)
    const [picture, setPicture] = useState({url: user.picture, id: user.picture_id})

    const onEdited = async () => {
        alert('수정되었습니다.')
        await refreshUser(token)
    };
    const onUploaded = async (data) => {
        setPicture({url:data.url, id: data.file_id})
    };

    const onUnauthorized = () => {
        alert('로그인이 필요합니다.')
    }
    const onForbidden = () => {
        alert('권한이 없습니다.')
    }
    const editProfile = async () => {
        const { code, data } = await client.put(`/api/members/my`, {
            nickname,
            picture_id: picture.id
        })

        switch (code) {
            case 201: onEdited(); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            case 403: onForbidden();
                break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }
    }

    const onLoadFile = async (e) => {
        const { code, data } = await client.filePost(e.target.files[0])

        switch (code) {
            case 200: await onUploaded(data); break
            // case 400: onBadRequest(data) break
            case 401: onUnauthorized(); break
            case 403: onForbidden();
                break
            // case 500:
            // default:
            //   onServerError(data)
            //   break
        }


    }


  return (
    <div>
      <h1>마이페이지</h1>
        <Image src={picture.url}/>
        <input type="file" onChange={onLoadFile} style={{display: 'block'}}/>
        <span>닉네임 : </span>
        <input value={nickname}
               onChange={e => setNickname(e.target.value)}/>
        <button onClick={editProfile} style={{display: 'block'}}>저장</button>
    </div>
  )
}

export default Me
