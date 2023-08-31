'use client'
import Image from 'next/image'
import Link from 'next/link'
import ListInitiatives from '@/components/ListInitiatives'

export default function RecentSec() {
  return (
    <section className='flex w-full items-center justify-center px-7'>
      <div className='container flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2>Recientes</h2>
          <Link href='/initiatives' className='flex gap-2'>
            Ver todas
            <Image src='/icon/arrow-right.svg' width={14} height={14} alt='arrow-right' />
          </Link>
        </div>
        <div className='flex  gap-5 overflow-y-scroll pb-6'>
          <ListInitiatives />
        </div>
      </div>
    </section>
  )
}
