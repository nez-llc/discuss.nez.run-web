import QuestionList from 'components/question/QustionList'
import {useEffect, useState} from "react";
import QuestionSearch from "components/question/QustionSearch";
import Router, {useRouter} from 'next/router';

const QuestionListPage = ({tag, keyword, sort}) => {

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
        <QuestionList tag={tag} keyword={keyword} sort={sort}/>
      </div>
    )
}

const getServerSideProps = async ({query}) => {
    return {
        props: {
            tag: query.tag || '',
            keyword: query.keyword || '',
            sort: query.sort || '',
        }
    }
}

export {
    getServerSideProps
}

export default QuestionListPage
