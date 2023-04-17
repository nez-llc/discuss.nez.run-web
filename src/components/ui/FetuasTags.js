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

const FeaturedTags = () => {
  const {tags} = useTagsData()

  return (
    <FeaturedTag>
      <p>추천태그</p>
      <Tags tags={tags}/>
    </FeaturedTag>
  )
}

export default FeaturedTags
