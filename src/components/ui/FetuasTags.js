import Tags from './Tags'
import React from 'react'
import {useTagsData} from 'data/tags'
import styled from '@emotion/styled'
import Pane from 'components/layout/Pane'

const FeaturedTag = styled(Pane)`
  display: grid;
  gap: 10px;
  
  p{
    margin: 0;
  }
`

const FeaturedTags = ({ view }) => {
  const {tags} = useTagsData()

  return (
    <FeaturedTag>
      {view !== 'nav' && <p>추천태그</p> }
      <Tags tags={tags} view={view}/>
    </FeaturedTag>
  )
}

export default FeaturedTags
