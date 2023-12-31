import { SearchInput } from '@/components'

function SearchBar() {
  return (
    <section className='flex max-w-4xl flex-col items-start justify-start px-5 py-5'>
      <h1 className='px-2 py-2 text-xl font-semibold leading-7 text-blue-600'>Buscar iniciativas </h1>
      <form className='flex w-full flex-col items-center justify-center gap-5'>
        <SearchInput placeholder='Buscar' name='search' />
        <SearchInput placeholder='Ubicación' icon='/icon/location_on_blue.svg' name='location' />
      </form>
    </section>
  )
}
export default SearchBar
