import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import CloseBtn from 'assets/close.png'
import { useApi } from 'utils/api'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

const Wrapper = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 30px;
  text-align: left;
  font-size: 20px;
  z-index: 999;
  a {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-decoration: none;
  }
`

const Hr = styled.hr`
  border: 0;
  border-bottom: 2px solid #000000;
  width: 100%;
  margin: 20px 0;
`

const Tags = styled.div`
  min-height: 50px;
  font-size: 18px;
  a{
    height: 50px;
    padding: 0 15px 0 0;
    white-space: pre;
  }
`

const CloseButton = styled.button`
  background: url("${CloseBtn.src}") no-repeat center;
  background-size: 30px;
  width: 40px;
  height: 40px;
  border: 0;
  margin-left: auto;
`
const NavMenu = ({setIsMenu, onChangeHeader, headerView}) => {
  const [ windowHeight, setWindowHeight ] = useState(0)
  const [ tags, setTags ] = useState(null)
  const { client } = useApi()
  const router = useRouter()

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const fetchTags = async () => {
      const param = {}
      const { code, data } = await client.get('/api/tags/', param)
      setTags(data)
    }
    fetchTags()
  }, [])

  return (
    <Wrapper height={windowHeight}>
      <CloseButton onClick={() => setIsMenu(false)}/>
      {headerView !== 3 ?
        <Link href="/me">
          <b>마이페이지</b>
        </Link>
        : <></>
      }
      <Hr />
      {headerView !== 2 ?
        <>
          <Link href="/agenda">
            <b>토론 살펴보기</b>
          </Link>
          <Tags>
            {tags?.map(tag => (
              <Link key={tag.id} href={{
                pathname: '/agenda',
                query: { ...router.query, tag: tag.name },
              }}>{tag.name}</Link>
            ))}
          </Tags>
          <Link href="/">
            <b><span css={css`color: #EB5757`}>토론 작성하기</span></b>
          </Link>
          <Hr />
        </>
        : <></>
      }
      { headerView !== 2 ?
        <>
          <Link href="/">
            우동디 소개
          </Link>
        </>
        : <></>
      }
      <Link href="/">
        뉴스레터
      </Link>
      { headerView !== 2 ?
        <>
          <Link href="/">
            정책
          </Link>
        </>
        : <></>
      }
      <Link href="/">
        제안하기
      </Link>
      <Link href="/">
        이용약관
      </Link>
      <div>
        <ul css={css`
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 13px;
          padding: 20px;
        `}>
          <li onClick={() => onChangeHeader(1)}>header 1</li>
          <li onClick={() => onChangeHeader(2)}>header 2</li>
          <li onClick={() => onChangeHeader(3)}>header 3</li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default NavMenu