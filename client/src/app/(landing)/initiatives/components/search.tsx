'use client'
import { SearchInput, UnstyledSelect } from '@/components'
import Image from 'next/image'
import { countries, uruguayProvinces, argentinaProvinces, colombiaProvinces } from '@/services/mock/locations.service'
import { useEffect, useState, useMemo } from 'react'
import { debounce } from 'lodash'
import { useRouter, usePathname } from 'next/navigation'
import { buildQueryString } from '@/utils/functions/buildQueryString.utils'
import { opportunities } from '@/services/mock/opportunities.service'
import { themes } from '@/services/mock/themes.service'

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

function Selects({ handleChange, filters }: any) {
  const activeProvinces = () => {
    switch (filters.country) {
      case 'Argentina':
        return argentinaProvinces
      case 'Uruguay':
        return uruguayProvinces
      case 'Colombia':
        return colombiaProvinces
      default:
        return []
    }
  }

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
      {filters.country && (
        <UnstyledSelect
          name='province'
          label='Provincia/Estado/Departamento de iniciativa'
          setSelected={(selected) => {
            handleChange(selected, 'province')
          }}
          names={activeProvinces()}
          placeholder='Selecciona una opcion'
        />
      )}
      <UnstyledSelect
        name='themes'
        label='Tema de iniciativa'
        setSelected={(selected) => {
          handleChange(selected, 'themes')
        }}
        names={themes}
        placeholder='Selecciona una opcion'
      />
      <UnstyledSelect
        name='opportunities'
        label='Oportunidad de la iniciativa'
        setSelected={(selected) => {
          handleChange(selected, 'opportunities')
        }}
        names={opportunities}
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
    country: '',
    province: '',
    themes: '',
    opportunities: ''
  })

  const handleChange = (query: string, filterName: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: query }))
  }

  const resetFilters = () => {
    setFilters({
      name: '',
      country: '',
      province: '',
      themes: '',
      opportunities: ''
    })
  }

  useEffect(() => {
    router.push(pathname + buildQueryString(filters))
  }, [filters])

  return (
    <section className='flex w-full flex-col items-center justify-center'>
      <Search handleChange={handleChange} />
      <Selects handleChange={handleChange} filters={filters} />
      <button className='text-pink-500' onClick={resetFilters}>
        Resetear filtros
      </button>
    </section>
  )
}
