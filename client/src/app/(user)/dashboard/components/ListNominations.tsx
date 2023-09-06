import Nomination from './Nomination'

const data = [
  {
    id: 1,
    nombre: 'Juan Perez',
    iniciativa: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    nombre: 'Juan Perez',
    iniciativa: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'

  },
  {
    id: 3,
    nombre: 'Juan Perez',
    iniciativa: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }

]
const ListNominations = () => {
  return (
    <section className='flex flex-col gap-4 px-4'>
      {
        data.map((nomination) => (
          <Nomination key={nomination.id} nombre={nomination.nombre} iniciativa={nomination.iniciativa} url={nomination.url} />
        ))
      }
    </section>
  )
}

export default ListNominations
