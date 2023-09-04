'use client'
import { SearchInput } from '@/components'
import Image from 'next/image'

export default function HeroSec() {
  return (
    <section className='flex w-full items-center justify-center'>
      <div className='container flex gap-8'>
        <div className='rounded-full p-3 bg-pink-100'>
<Image
  src='/icon/tune.svg'
  alt='tune'
  width={24}
  height={24}
  />
        </div>
        <SearchInput placeholder='Buscar' />
      </div>
    </section>
  )
}
