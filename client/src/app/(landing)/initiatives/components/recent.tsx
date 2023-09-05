'use client'
import { InitiativeItem } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

const initiatives = [
  {
    title: 'Salvemos la fauna',
    image:
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    location: 'CABA'
  },
  {
    title: 'Salvemos la flora',
    image:
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fG5hdHVyYWxlemF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    location: 'Tigre, Buenos Aires'
  },
  {
    title: 'Salvemos el ecoparque',
    image:
      'https://images.unsplash.com/photo-1623593419606-7f9c8c22d736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'CABA'
  },
  {
    title: 'Ayuda para las inunciones',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    location: 'La Plata, Buenos Aires'
  },
  {
    title: 'Todos por los capibara',
    image:
      'https://images.unsplash.com/photo-1577049205905-e4d91edc0a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    location: 'CABA'
  }
]

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
          {initiatives.map((item, index) => (
            <InitiativeItem
              key={index}
              title={item.title}
              image={item.image}
              location={item.location}
              minWidth='min-w-[65vw] lg:min-w-[0] '
            />
          ))}
        </div>
      </div>
    </section>
  )
}
