'use client'
import { SearchInput } from '@/components'

export default function HeroSec() {
  return (
    <section className='flex w-full items-center justify-center px-7'>
      <div className='container flex flex-col'>
        <SearchInput placeholder='Buscar' />
      </div>
    </section>
  )
}
