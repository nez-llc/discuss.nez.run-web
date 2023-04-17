import Introduce from 'components/Introduce'
import AgendaList from 'components/agenda/AgendaList'
import Container from 'components/layout/Container'
import Pane from 'components/layout/Pane'
import Button from 'components/ui/Button'
import styled from '@emotion/styled'
import Link from 'next/link'
import More from 'assets/icons/more.svg?inline'
import FeaturedTags from '../components/ui/FetuasTags'
import React from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

const SummaryContainer = styled(Container)`
  display: grid;
  //flex-direction: column;
  gap: 48px;
`

const Section = styled(Pane)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
`

const SectionFooter = styled.div`
  display: flex;
  justify-content: center;
`

const MoreButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  margin-left: auto;
  
  display: flex;
  gap: 8px;
  align-items: center;
`

const AgendaAllView = styled(Link)`
  width: 150px;
  height: 40px;
  padding: 0;
  line-height: 40px;
  border-radius: 100px;
  background: #275EA7;
  color: #fff;
  text-decoration: none;
  text-align: center;
`

const LinkButton = MoreButton.withComponent(Link)

const IndexPage = () => (
  <Wrapper>
    <Introduce />
    <SummaryContainer>
      <Section>
        <SectionHeader>
          <Pane.Title>인기 토론</Pane.Title>
          <LinkButton href="/agenda">더보기<More /></LinkButton>
        </SectionHeader>
        <AgendaList query={{ featured: true }} isMain />
      </Section>
      <Section>
        <SectionHeader>
          <Pane.Title>최신 토론</Pane.Title>
          <LinkButton href="/agenda">더보기<More /></LinkButton>
        </SectionHeader>
        <FeaturedTags />
        <AgendaList query={{ featured: false }} isMain />
        <SectionFooter>
          <AgendaAllView href="/agenda">
            토론 전체보기
          </AgendaAllView>
        </SectionFooter>
      </Section>
    </SummaryContainer>
  </Wrapper>
)

export default IndexPage
