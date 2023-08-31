'use client'
import Image from 'next/image'

export default function HeroSec() {
  return (
    <section className='flex w-full items-center justify-center px-7'>
      <div className='container flex flex-col bg-gray-200'>
        <div className='relative h-[20vh] lg:h-[30vh] w-full '>
          <Image
            src='https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80'
            alt='hero'
            fill
            className='object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 p-3'>
          <h1>Titulo Iniciativa</h1>
          <div className='flex gap-2'>
            <Image
              src='https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80'
              alt='hero'
              width={30}
              height={30}
              className='aspect-square rounded-full object-cover'
            />
            <p>Nombre de usuario</p>
          </div>
        </div>
      </div>
    </section>
  )
}
