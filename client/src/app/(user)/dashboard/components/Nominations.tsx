import ListNominations from './ListNominations'
import Title from './Title'

const Nominations = () => {
  return (
    <>
      <section className='flex flex-col gap-4 py-4'>

        <Title title='Postulaciones' />
        <ListNominations />
      </section>
    </>
  )
}

export default Nominations
