import QuestionList from 'components/question/QustionList'

const QuestionListPage = ({tag}) => (
  <div>
    <QuestionList tag={tag}/>
  </div>
)

const getServerSideProps = async ({query}) => {
    return {
        props: {
            tag: query.tag || ''
        }
    }
}

export {
    getServerSideProps
}

export default QuestionListPage
