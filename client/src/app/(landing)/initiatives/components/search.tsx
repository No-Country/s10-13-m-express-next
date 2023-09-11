'use client'
import { SearchInput } from '@/components'
import { buildQueryString } from '@/utils/functions/buildQueryString.utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Selects from './selects'

export default function SearchSection() {
  const router = useRouter()
  const pathname = usePathname()
  const [query, setQuery] = useState({
    title: '',
    country: '',
    province: '',
    opportunities: '',
    themes: ''
  })

  const searchHandler = (queryObj: Record<string, string>) => {
    setQuery((prev) => ({ ...prev, ...queryObj }))
  }

  const debouncedSearchHandler = useMemo(() => {
    return debounce(searchHandler, 1000)
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchHandler({ [event.target.name]: event.target.value })
  }

  const handleSelectChange = (name: string, value: any) => {
    debouncedSearchHandler({ [name]: value })
  }

  useEffect(() => {
    router.push(pathname + buildQueryString(query))
  }, [query])

  return (
    <section className='flex w-full flex-col items-center justify-center'>
      <div className='flex w-full gap-8'>
        <div className='flex items-center justify-center rounded-full bg-pink-100 p-3'>
          <Image src='/icon/tune.svg' alt='tune' width={24} height={24} />
        </div>
        <SearchInput name='title' placeholder='Buscar' handleChange={handleSearchChange} />
      </div>
      <Selects handleChange={handleSelectChange} query={query} />
    </section>
  )
}