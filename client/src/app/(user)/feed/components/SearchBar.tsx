import { SearchInput } from '@/components'

function SearchBar() {
  return (
    <section
      className=' flex flex-col
     items-center justify-center px-5 py-5'
    >
      <h1 className='px-3 text-xl font-semibold leading-7 text-blue-700'>Buscar iniciativas </h1>
      <div className='flex w-full flex-col items-center justify-center gap-8'>
        <SearchInput placeholder='Buscar' />
        <SearchInput placeholder='Ubicación' icon='/icon/location_on_blue.svg' />
      </div>
    </section>
  )
}
export default SearchBar
