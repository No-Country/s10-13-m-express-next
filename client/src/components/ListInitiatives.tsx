import { InitiativeItem } from '.'

const initiatives = [
  {
    id: 1,
    title: 'Salvemos la fauna',
    image:
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    location: 'CABA',
    reviews: 4,
    categories: ['Animales']
  },
  {
    id: 2,
    title: 'Salvemos la flora',
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG5hdHVyYWxlemF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    location: 'Tigre, Buenos Aires',
    reviews: 5,
    categories: ['Plantas']
  },
  {
    id: 3,
    title: 'Salvemos el ecoparque',
    image:
      'https://images.unsplash.com/photo-1623593419606-7f9c8c22d736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'CABA',
    reviews: 3,
    categories: ['Plantas']
  },
  {
    id: 4,
    title: 'Ayuda para las inunciones',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'La Plata, Buenos Aires',
    reviews: 4,
    categories: ['Emergercias']
  },
  {
    id: 5,
    title: 'Todos por los capibara',
    image:
      'https://images.unsplash.com/photo-1577049205905-e4d91edc0a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    location: 'CABA',
    reviews: 5,
    categories: ['Animales']
  }
]

const ListInitiatives = () => {
  return (
    <>
      {initiatives.map((initiative) => (
        <InitiativeItem
          title={initiative.title}
          image={initiative.image}
          location={initiative.location}
          categories={initiative.categories}
          reviews={initiative.reviews}
          key={initiative.id}
          id={initiative.id}
        />
      ))}
    </>
  )
}

export default ListInitiatives
