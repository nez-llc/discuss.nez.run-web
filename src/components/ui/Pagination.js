import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import {useQuestions} from "../../data/questions";
import {useRouter} from "next/router";

const Wrapper = styled.ul`
  padding: 8px;
  display: flex;
  gap: 8px;
  justify-content: center;
`

const Item = styled.li`
  border: 1px solid black;
  padding: 8px;
`

const Pagination = ({tag}) => {
    const router = useRouter();
    const { total } = useQuestions(tag);

    const pages = [];

    for (let i = 1; i <= Math.ceil(total/10); i++) {
        pages.push((
            <Link href={{
                pathname: router.pathname,
                query: { ...router.query, page: i },
            }}>
                <Item>{i}</Item>
            </Link>
        ))
    }


    return (
      <Wrapper>
          {pages}
      </Wrapper>
    )
}

export default Pagination
