'use client'
import { SearchInput } from '@/components'

export default function HeroSec() {
  return (
    <section className='flex w-full items-center justify-center'>
      <div className='container flex flex-col gap-4'>
      <h2 className='font-normal text-xl text-blue-600'>Buscar Iniciativas</h2>
        <div className='flex flex-col gap-2'>
          <SearchInput placeholder='Buscar' />
          <SearchInput placeholder='Ubicacion' />
        </div>
      </div>
    </section>
  )
}
