'use client'
import Image from 'next/image'
import { useAppDispatch } from '@/redux/hooks'
import { setSearch } from '@/redux/slices/filters'
import { debounce } from 'lodash'
import { useMemo } from 'react'

interface SearchInputProps {
  placeholder: string
  icon?: string
}

export default function SearchInput({ placeholder, icon = '/icon/search.svg' }: SearchInputProps) {
  const dispatch = useAppDispatch()

  const realizarBusqueda = (searchTerm: string) => {
    dispatch(setSearch(searchTerm))
  }

  const debouncedRealizarBusqueda = useMemo(() => {
    return debounce(realizarBusqueda, 1000)
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value
    debouncedRealizarBusqueda(newSearchTerm)
  }

  return (
    <div className='flex w-full items-center gap-3 rounded-full  bg-pink-100 px-4 py-3'>
      <Image src={icon} width={16} height={16} alt='search' />
      <input
        type='text'
        placeholder={placeholder}
        className='w-full  min-w-0 border-none bg-transparent placeholder:font-bold placeholder:text-gray-800 focus:outline-none'
        onChange={handleSearchChange}
      />
    </div>
  )
}
