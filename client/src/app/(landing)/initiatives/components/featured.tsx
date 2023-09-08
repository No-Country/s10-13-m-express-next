'use client'
import Image from 'next/image'
import Link from 'next/link'
import { InitiativesFlex } from '@/components'
import { useGetInitiativesQuery } from '@/redux/services/initiatives.service'

export default function FeaturedSec() {
  const { data } = useGetInitiativesQuery()
  return (
    <section className='flex w-full items-center justify-center'>
      <div className='container flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-normal text-blue-600'>Destacadas</h2>
          <Link href='/initiatives' className='flex items-center gap-4 '>
            <span className='text-base font-normal leading-4 text-blue-500'>ver todas</span>
            <Image src='/icon/arrow-right.svg' width={7} height={12} alt='arrow-right' />
          </Link>
        </div>
        <InitiativesFlex initiatives={data || []} />
      </div>
    </section>
  )
}
