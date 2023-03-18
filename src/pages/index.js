import Introduce from 'components/Introduce'
import AgendaList from 'components/agenda/AgendaList'
import Container from 'components/layout/Container'

const IndexPage = () => (
  <div>
    <Introduce />
    <Container>
      <section>
        <h3>인기 주제</h3>
        <AgendaList query={{ featured: true }} />
      </section>
      <section>
        <h3>최신 주제</h3>
        <AgendaList query={{ featured: false }} />
      </section>
    </Container>
  </div>
)

export default IndexPage
