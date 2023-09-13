import { SearchInput } from '@/components'

function SearchBar() {
  return (
    <section className='flex max-w-4xl items-center justify-center px-5 py-5'>
      <h1 className='px-2 py-2 text-xl font-semibold leading-7 text-blue-600'>Buscar iniciativas </h1>
      <form className='flex w-full flex-col  gap-5'>
        <SearchInput placeholder='Buscar' />
        <SearchInput placeholder='Ubicación' icon='/icon/location_on_blue.svg' />
      </form>
    </section>
  )
}
export default SearchBar
