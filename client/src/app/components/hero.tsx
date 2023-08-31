'use client'
import { SearchInput } from '@/components'

export default function HeroSec() {
  return (
    <section className='flex w-full items-center justify-center px-7'>
      <div className='container flex flex-col gap-4 bg-gray-300 p-4'>
        <h1>Titulo H1</h1>
        <div className='flex flex-col gap-4'>
          <SearchInput placeholder='Buscar' />
          <SearchInput placeholder='Iniciativa' />
        </div>
      </div>
    </section>
  )
}
