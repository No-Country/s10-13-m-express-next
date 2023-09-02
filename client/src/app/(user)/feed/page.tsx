import { Volunteer } from '@/components'
import CardLastesUpdates from '@/components/latest-updates/CardLatesUpdates'
import SearchBar from '@/components/search/SearchBar'

export default function FeedPage() {
  return (
    <main className='flex flex-col py-5 px-5'>
      <SearchBar search='hola' location='mundo' />
      <section>
        <Volunteer />
      </section>
      <section className='py-4'>
        <h1 className='text-left text-3xl mb-4 bg-white font-bold text-gray-800 mx-auto px-2'>Publicaciones Recientes</h1>
        <CardLastesUpdates />
      </section>
    </main>
  )
}
