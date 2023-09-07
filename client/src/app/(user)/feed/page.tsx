import Volunteer from './components/Volunteer'
import LatestUpdatesCards from './components/LatestUpdatesCards'
import SearchBar from './components/SearchBar'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderComponents {
  titleHeader: string
  path: string
}

function ContainerHeader({ titleHeader, path }: HeaderComponents) {
  return (
    <div className='gap flex justify-between gap-5 py-4'>
      <h1 className='mx-auto text-xl font-semibold text-blue-600'>{titleHeader}</h1>
      <Link href={path} className='flex items-center gap-4 '>
        <span className='text-base font-normal leading-4 text-blue-500'>ver todas</span>
        <Image src='/icon/arrow-righ.svg' width={15} height={15} alt='arrow-right' />
      </Link>
    </div>
  )
}

export default function FeedPage() {
  return (
    <main className='flex flex-col px-5 py-5'>
      <SearchBar />
      <ContainerHeader titleHeader='Mis voluntariados' path='#' />
      <Volunteer />
      <ContainerHeader titleHeader='Publicaciones Recientes' path='#' />
      <LatestUpdatesCards />
    </main>
  )
}
