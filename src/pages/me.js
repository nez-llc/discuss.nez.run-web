import { useState } from 'react'
import styled from '@emotion/styled'
import Container from 'components/layout/Container'
import ProfilePicture from 'components/ui/ProfilePicture'
import UserComments from 'components/member/UserComments'
import UserVotes from 'components/member/UserVotes'
import { useAuth } from 'auth/use-auth'
import { useApi } from 'utils/api'
import { fromNow } from 'utils/date'

const Nickname = styled.p`
`

const EditButton = styled.button`
`

const Profile = ({ user }) => {
  const { client } = useApi()
  const [nickname, setNickname] = useState(user.nickname)
  const [picture, setPicture] = useState({
    url: user.picture,
    id: user.picture_id,
  })

  const onUploaded = async (data) => {
    setPicture({url: data.url, id: data.file_id})
  }

  const onUnauthorized = () => {
    alert('로그인이 필요합니다.')
  }

  const onForbidden = () => {
    alert('권한이 없습니다.')
  }

  const onLoadFile = async (e) => {
    const { code, data } = await client.filePost(e.target.files[0])

    switch (code) {
      case 200: await onUploaded(data); break
      // case 400: onBadRequest(data) break
      case 401: onUnauthorized(); break
      case 403: onForbidden()
        break
    }
  }

  return (
    <div>
      <EditButton>수정</EditButton>
      <ProfilePicture url={user.picture} />
      <div>
        <Nickname>{user.nickname}</Nickname>
      </div>
      <p>활동 점수 : {user.active_point}</p>
      <p>가입일 : {fromNow(user.date_joined)}</p>
    </div>
  )
}

const ActivityLogs = ({ userId }) => {
  // TODO : tab으로 나눔
  return (
    <div>
      <UserComments userId={userId} />
      <UserVotes userId={userId} />
    </div>
  )
}

const Me = () => {
  const { user, refresh } = useAuth()

  return (
    <div>
      <Container>
        <h1>마이페이지</h1>
        <div>
          <h2>프로필</h2>
          <Profile user={user} onUpdated={refresh} />
        </div>
        <div>
          <h2>활동 로그</h2>
          <ActivityLogs userId={user.id} />
        </div>
      </Container>
    </div>
  )
}

export default Me
