'use client'
import Image from 'next/image'

interface Search {
  search: string
  location: string
}
function SearchBar ({ search, location }: Search) {
  return (
    <form className='flex flex-col px-5 py-5 border border-gray-600'>
      <h1 className='px-3'>Titulo </h1>
      <div className='relative px-3 py-3'>
        <div className='absolute inset-y-2 left-3 flex items-center pl-3 pointer-events-none'>
          <Image src='/icon/search.svg' width={20} height={20} alt='search-icon' />
        </div>
        <input type='text' id='default-search' className='block w-full py-4 pl-10 text-sm bg-gray-200 border border-gray-300 rounded-full' placeholder='Buscar' required />
      </div>
      <div className='relative px-3 py-3'>
        <div className='absolute inset-y-2 left-3 flex items-center pl-3 pointer-events-none'>
          <Image src='/icon/location.svg' width={20} height={20} alt='location-icon' />
        </div>
        <input type='text' id='default-search' className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-200' placeholder='Ubicación' required />
      </div>
    </form>
  )
}
export default SearchBar
