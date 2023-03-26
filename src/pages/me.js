import { useState } from 'react'
import styled from '@emotion/styled'
import Container from 'components/layout/Container'
import ProfilePicture from 'components/ui/ProfilePicture'
import UserComments from 'components/member/UserComments'
import UserVotes from 'components/member/UserVotes'
import { useAuth } from 'auth/client'
import { useApi } from 'utils/api'
import { fromNow } from 'utils/date'

const UserProfile = styled.ul`
  padding: 35px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  p {
    margin: 0;
  }
`

const ProfileInfo = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  
  padding: 0;
`

const Nickname = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 150%;

  color: #09101D;
`

const JoinDate = styled.p`
  font-weight: 400;
  font-size: 12px;

  color: #828282;

`

const ActivityPoint = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 140%;

  color: #09101D;
`

const ActivityLabel = styled.p`
  font-weight: 400;
  font-size: 15px;
  line-height: 150%;
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
    <UserProfile>
      {/* <EditButton>수정</EditButton> */}
      {/* <ProfilePicture url={user.picture} /> */}
      <ProfileInfo>
        <ProfilePicture url={'/profile-pictures/pochaco.jpeg'} size={{width: '120px', height: '120px'}} />
      </ProfileInfo>
      <ProfileInfo>
        <Nickname>{user.nickname}</Nickname>
        <JoinDate>{fromNow(user.date_joined)}부터 활동</JoinDate>
      </ProfileInfo>
      <ProfileInfo>
        <ActivityPoint>{user?.active_point ? user.active_point : 0}</ActivityPoint>
        <ActivityLabel>받은 공감수</ActivityLabel>
      </ProfileInfo>
    </UserProfile>
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
        <div>
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
