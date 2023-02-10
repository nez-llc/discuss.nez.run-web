import {useApi} from 'utils/api'
import {useAuth} from 'auth/use-auth'
import React, {useState} from 'react'
import styled from '@emotion/styled'
import ProfilePicture from '../components/ui/ProfilePicture'

const Image = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`

const Me = () => {
  const { client } = useApi()
  const { token, user, refreshUser, activeLogs } = useAuth()
  const [nickname, setNickname] = useState(user.nickname)
  const [picture, setPicture] = useState({url: user.picture, id: user.picture_id})
  const [editBtnVisible, setEditBtnVisible] = useState(false)

  const onEdited = async () => {
    alert('수정 되었습니다.')
    setEditBtnVisible(!editBtnVisible)
    await refreshUser(token)
  }

  const onUploaded = async (data) => {
    setPicture({url: data.url, id: data.file_id})
  }

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  const onForbidden = () => {
    alert('권한이 없습니다.')
  }

  const editProfile = () => {
    setEditBtnVisible(!editBtnVisible)
  }

  const saveProfile = async () => {
    const { code, data } = await client.put('/api/members/my', {
      nickname,
      picture_id: picture.id
    })

    switch (code) {
      case 201: onEdited(); break
      // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
        break
      // case 500:
      // default:
      //   onServerError(data)
      //   break
    }
  }

  const cancelEditProfile = () => {
    setNickname(user.nickname)
    setEditBtnVisible(!editBtnVisible)
  }

  const onLoadFile = async (e) => {
    const { code, data } = await client.filePost(e.target.files[0])

    switch (code) {
      case 200: await onUploaded(data); break
      // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
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
      <div>
        <h2>프로필</h2>
        <div>
          <Image>
            <ProfilePicture url={picture.url}/>
          </Image>
          <p>활동지수({user.active_point})</p>
          { editBtnVisible ?
            <>
              <input value={nickname} onChange={e => setNickname(e.target.value)}/> 님 (가입일시 : {user.date_joined})
              <input type="file" onChange={onLoadFile} style={{display: 'block'}}/>
            </>
            : <span>{user.nickname ? user.nickname : 'none' } 님 (가입일시 : {user.date_joined})</span>
          }
        </div>
        { editBtnVisible ?
          <>
            <button onClick={saveProfile}>저장</button>
            <button onClick={cancelEditProfile}>취소</button>
          </> :
          <button onClick={editProfile}>프로필 수정</button>
        }
      </div>
      <div>
        <h2>활동 로그</h2>
        {activeLogs.length > 0 ? activeLogs.map(log => (
          <div key={log.id}>
            <ul>
              <li>{log.agenda_title}</li>
              <li>{log.content}</li>
              <li>{log.created_time}</li>
            </ul>
          </div>
        )) : ''}
      </div>
    </div>
  )
}

export default Me