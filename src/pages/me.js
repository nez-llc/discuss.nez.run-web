import {useApi} from "utils/api";
import {useAuth} from "auth/use-auth";
import {useState} from "react";

const Me = () => {
    const { client } = useApi()
    const { token, user, refreshUser } = useAuth()
    console.log('user',user)
    const [nickname, setNickname] = useState(user.nickname)
    const [picture_id, setPicture_id] = useState(user.nickname)

    const onEdited = async () => {
        alert('수정되었습니다.')
        await refreshUser(token)
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
            picture_id
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

  return (
    <div>
      <h1>마이페이지</h1>
        <span>닉네임 : </span>
        <input value={nickname}
               onChange={e => setNickname(e.target.value)}/>
        <button onClick={editProfile}>저장</button>
    </div>
  )
}

export default Me
