import ActiveInitiative from './ActiveInitiative'

const data = [
  {
    id: 1,
    title: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 2,
    title: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 3,
    title: 'Ayudantes para la playa',
    url: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
]

interface Initiative {
  id: number
  title: string
  url: string
}

const ListActiveInitiatives = () => {
  return (
    <section className='flex gap-4 pl-4'>
      {

      data.map((initiative: Initiative) => (
        <ActiveInitiative key={initiative.id} title={initiative.title} url={initiative.url} />
      ))
    }
    </section>
  )
}

export default ListActiveInitiatives
