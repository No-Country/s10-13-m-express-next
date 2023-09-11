'use client'
import { SearchInput, UnstyledSelect } from '@/components'
import Image from 'next/image'
import { countries } from '@/services/mock/locations.service'
import { useEffect, useState, useMemo } from 'react'
import { debounce } from 'lodash'
import { useRouter, usePathname } from 'next/navigation'
import { buildQueryString } from '@/utils/functions/buildQueryString.utils'

function Search({ handleChange }: any) {
  const searchHandler = (searchTerm: string) => {
    handleChange(searchTerm, 'name')
  }

  const debouncedSearchHandler = useMemo(() => {
    return debounce(searchHandler, 1000)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchHandler(event.target.value)
  }

  return (
    <div className='flex w-full gap-8'>
      <div className='flex items-center justify-center rounded-full bg-pink-100 p-3'>
        <Image src='/icon/tune.svg' alt='tune' width={24} height={24} />
      </div>
      <SearchInput placeholder='Buscar' handleChange={handleInputChange} />
    </div>
  )
}

function Selects({ handleChange }: any) {
  return (
    <div>
      <UnstyledSelect
        name='country'
        label='Pais de iniciativa'
        setSelected={(selected) => {
          handleChange(selected, 'country')
        }}
        names={countries}
        placeholder='Selecciona una opcion'
      />
    </div>
  )
}

export default function SearchSection() {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState({
    name: '',
    country: ''
  })

  const handleChange = (query: string, filterName: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: query }))
  }

  useEffect(() => {
    router.push(pathname + buildQueryString(filters))
  }, [filters])

  return (
    <section className='flex w-full flex-col items-center justify-center'>
      <Search handleChange={handleChange} />
      <Selects handleChange={handleChange} />
    </section>
  )
}
