import React, {useState} from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import Logo from 'components/Logo'
import Account from 'components/member/Account'
import SearchImg from '../../assets/search.png'
import MenuImg from '../../assets/menu.png'
import FilterImg from '../../assets/filter_list.png'
import AccountImg from '../../assets/person.png'

const Wrapper = styled.header`
  background: white;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //padding: 8px;
  //box-shadow: ${({ theme }) => theme.shadow};
  padding: 0 100px;
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
  justify-content: ${props => props.headerView === 3 ? 'center' : 'normal'};
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
  right: 0;
  position: absolute;
  margin-top: 7px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`

const A = styled.a`
  margin: 0 15px;
`

const NavButton = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    display: flex;
    margin-left: auto;
    gap: 15px;
    button{
      background-color: transparent;
      background-size: 25px;
      background-position: center;
      background-repeat: no-repeat;
      border: 0;
      width: 40px;
      height: 40px;
    }
  }
`

const NavButton2 = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: block;
    ${props => props.margin === 'left' ? 'margin-right: auto;' : 'margin-left: auto;'};
    background: rgba(255, 104, 97, 0.1);
    border-radius: 12px;
    button{
      background-color: transparent;
      background-size: 20px;
      background-position: center;  
      background-repeat: no-repeat;
      border: 0;
      width: 40px;
      height: 40px;
    }
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
  background-image: url("${SearchImg.src}");
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  opacity: 0.5;
`

const MenuTab = styled.div`
  display: none;
  @media screen and (max-width: 900px) {
    display: block;
    width: 100%;
    padding-top: 30px;
    a {
      text-decoration: none;
      cursor: pointer;
    }
    ul {
      display: flex;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    li {
      width: 33.3%;
    }
  }
`

const MenuTabLi = styled.li`
  border-bottom: ${props => props.isSelected ? '2px solid #1890FF;' : '0'}
`

const BtnHeaderSearch = styled.button`
  background-image: url("${SearchImg.src}");
`

const BtnHeaderMenu = styled.button`
  background-image: url("${MenuImg.src}");
`

const BtnHeaderMenu2 = styled.button`
  background-image: url("${FilterImg.src}");
`

const BtnHeaderAccount = styled.button`
  background-image: url("${AccountImg.src}");
`

const Header = () => {
  const [headerView, setHeaderView] = useState(3)
  const [isSearch, setIsSearch] = useState(false)

  const [isAgenda, setIsAgenda] = useState(false)
  const [isWdd, setIsWdd] = useState(false)
  const [isReference, setIsreference] = useState(false)

  const onSearch = () => {
    setIsSearch(!isSearch)
  }

  const onSelectedTab = (tab) => {
    setIsAgenda(false)
    setIsWdd(false)
    setIsreference(false)

    if(tab === 'agenda'){
      setIsAgenda(true)
    } else if(tab === 'wdd'){
      setIsWdd(true)
    } else if(tab === 'reference'){
      setIsreference(true)
    }
  }
  return (
    <Wrapper>
      <Nav headerView={headerView}>
        {headerView === 3 ?
          <NavButton2 margin={'left'}><BtnHeaderMenu2/></NavButton2>
          : <></>
        }
        <Link href="/" onClick={() => onSelectedTab('main')}>
          <Logo />
        </Link>
        {headerView === 3 ?
          <NavButton2><Link href="/#"><BtnHeaderAccount onClick={onSearch} /></Link></NavButton2>
          : <NavButton>
            {headerView === 1 ?
              <BtnHeaderSearch onClick={onSearch} />
              : <></>
            }
            <BtnHeaderMenu />
          </NavButton>
        }
        <NavBox>
          <Link href="/agenda">
            질문 목록
          </Link>
          <Link href="/reference">
            정책 정보
          </Link>
          <Link href="/search">
            검색
          </Link>
        </NavBox>
      </Nav>
      <Tools>
        <Account />
      </Tools>
      { headerView === 3 && isSearch ?
        <SearchForm>
          <SearchInput placeholder={'검색어를 입력해주세요.'}></SearchInput>
          <SearchBtn />
        </SearchForm>
        : isSearch ?
          <>
            <SearchForm>
              <SearchInput placeholder={'검색어를 입력해주세요.'}></SearchInput>
              <SearchBtn />
            </SearchForm>
            <RecentKeywords>
              <dl>
                <dt>최근검색어</dt>
                <dd>keywords</dd>
                <dd>keywords1</dd>
                <dd>keywords2</dd>
              </dl>
            </RecentKeywords>
          </>
          : <></>
      }
      {headerView === 2 ?
        <MenuTab>
          <ul>
            <MenuTabLi isSelected={isAgenda}>
              <Link href="/agenda" onClick={() => onSelectedTab('agenda')}>
                토론장
              </Link>
            </MenuTabLi>
            <MenuTabLi isSelected={isWdd}>
              <Link href="#" onClick={() => onSelectedTab('wdd')}>
                우동디 이야기
              </Link>
            </MenuTabLi>
            <MenuTabLi isSelected={isReference}>
              <Link href="/reference" onClick={() => onSelectedTab('reference')}>
                데이터 정책
              </Link>
            </MenuTabLi>
          </ul>
        </MenuTab>
        : <></>
      }
    </Wrapper>
  )
}

export default Header
