import Image from 'next/image'

interface Search {
  search: string
  location: string
}
function SearchBar({ search, location }: Search) {
  return (
    <form className='flex flex-col border border-gray-600 px-5 py-5'>
      <h1 className='px-3'>Titulo </h1>
      <div className='relative px-3 py-3'>
        <div className='pointer-events-none absolute inset-y-2 left-3 flex items-center pl-3'>
          <Image src='/icon/search.svg' width={20} height={20} alt='search-icon' />
        </div>
        <input
          type='text'
          id='default-search'
          className='block w-full rounded-full border border-gray-300 bg-gray-200 py-4 pl-10 text-sm'
          placeholder='Buscar'
          required
        />
      </div>
      <div className='relative px-3 py-3'>
        <div className='pointer-events-none absolute inset-y-2 left-3 flex items-center pl-3'>
          <Image src='/icon/location.svg' width={20} height={20} alt='location-icon' />
        </div>
        <input
          type='text'
          id='default-search'
          className='block w-full rounded-full border border-gray-300 bg-gray-200 p-4 pl-10 text-sm text-gray-900'
          placeholder='Ubicación'
          required
        />
      </div>
    </form>
  )
}
export default SearchBar
