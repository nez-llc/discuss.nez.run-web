import QuestionList from 'components/question/QustionList'
import {useEffect, useState} from "react";
import QuestionSearch from "components/question/QustionSearch";
import Router, {useRouter} from 'next/router';

const QuestionListPage = ({tag, keyword}) => {

    const router = useRouter();
    const [searchValue, setSearchValue] = useState(keyword)

    useEffect(() => {
    }, [router.query]);

    const search = () => {
        Router.push({
            pathname: router.pathname,
            query: { ...router.query, keyword: searchValue },
        })
    }

    return (
      <div>
          <QuestionSearch searchValue={searchValue} setSearchValue={setSearchValue} search={search}/>
        <QuestionList tag={tag} keyword={keyword}/>
      </div>
    )
}

const getServerSideProps = async ({query}) => {
    return {
        props: {
            tag: query.tag || '',
            keyword: query.keyword || '',
        }
    }
}

export {
    getServerSideProps
}

export default QuestionListPage
