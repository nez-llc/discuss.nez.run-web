import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Account from 'components/member/Account'
import SearchImg from 'assets/search.png'
import MenuImg from 'assets/menu.png'
import MainSearchImg from 'assets/search_white.png'
import MainMenuImg from 'assets/menu_white.png'
import NavMenu from 'components/ui/NavMenu'
import Router, {useRouter} from 'next/router'
import Image from 'next/image'

const Wrapper = styled.header`
  background: white;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: 8px;
  //box-shadow: ${({ theme }) => theme.shadow};
  padding: 0 40px;
  border-bottom: 1px solid black;
  height: 75px;
    @media screen and (max-width: 900px) {
      padding: 15px;
      height: 100%;
      flex-direction: column;
      border: 0;
    }
`

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  flex-grow: 1;
  position: relative;
  a {
    text-decoration: none;
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 40px;
  }
`

const Tools = styled.div`
  padding: 10px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`

const NavBox = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  margin-left: auto;
  ${props => props.isMain && `
    color: #fff;
  `};
  
  @media screen and (max-width: 900px) {
    display: none;
  }
`

const NavButton = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    margin-left: auto;
    gap: 15px;
  }
`

const HeaderBtn = styled.button`
  background-color: transparent;
  border: 0;
  width: 40px;
  height: 40px;
  
  img {
    height: fit-content;
  }
`

const SearchForm = styled.div`
  @media screen and (max-width: 900px) {
    display: flex;
    margin-top: 25px;
    width: 100%;
    height: 40px;
    background: #F4F6F9;
    border-radius: 25px;
    padding: 10px 20px;
  }
`

const RecentKeywords = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  
  dt {
    font-size: small;
    height: 30px;
  }
  dd{
    text-align: left;
    font-size: small;
    height: 25px;
  }
`

const SearchInput = styled.input`
  background-color: transparent;
  border: 0;
  width: 100%;
  font-size: small;
`

const SearchBtn = styled.button`
  width: 20px;
  margin-left: auto;
  border: 0;
  background: url("${SearchImg.src}") no-repeat center;
  background-size: 15px;
  opacity: 0.5;
`

const Header = () => {
  const router = useRouter()
  const [headerView, setHeaderView] = useState(3)
  const [isSearch, setIsSearch] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
  const [isMain, setIsMain] = useState(false)

  const pathName = router.pathname

  useEffect(() => {
    if(pathName === '/'){
      setIsMain(true)
    }else{
      setIsMain(false)
    }
  }, [router.pathname])

  const onSearch = () => {
    setIsSearch(!isSearch)
  }

  const onChangeHeader = (state) => {
    setHeaderView(state)
    setIsMenu(false)
  }

  return (
    <Wrapper>
      <Nav headerView={headerView}>
        <Link href="/">
          <Logo isMain={isMain}/>
        </Link>
        <NavButton>
          <HeaderBtn onClick={onSearch}>
            <Image src={isMain ? MainSearchImg : SearchImg} alt={'search btn'} />
          </HeaderBtn>
          <HeaderBtn onClick={() => setIsMenu(true)}>
            <Image src={isMain ? MainMenuImg : MenuImg} alt={'menu btn'} />
          </HeaderBtn>
        </NavButton>
        <NavBox isMain={isMain}>
          <Link href="#">
            우동디 이야기
          </Link>
          <Link href="/agenda">
            토론하기
          </Link>
          <Link href="/reference">
            디지털정책
          </Link>
          <Link href="#">
            뉴스레터
          </Link>
          <Link href="/search">
            <HeaderBtn onClick={onSearch}>
              <Image src={isMain ? MainSearchImg : SearchImg} alt={'search btn'} />
            </HeaderBtn>
          </Link>
        </NavBox>
      </Nav>
      {/* <Tools>
        <Account />
      </Tools> */}
      { isSearch &&
        <>
          <SearchForm>
            <SearchInput placeholder={'검색어를 입력해주세요.'}></SearchInput>
            <SearchBtn />
          </SearchForm>
          <RecentKeywords>
            <dl>
              <dt>최근 검색어</dt>
              <dd>keywords</dd>
              <dd>keywords1</dd>
              <dd>keywords2</dd>
            </dl>
          </RecentKeywords>
        </>
      }
      { isMenu &&
        <NavMenu
          setIsMenu={setIsMenu}
          onChangeHeader={onChangeHeader}
          headerView={headerView}/>
      }
    </Wrapper>
  )
}

export default Header
