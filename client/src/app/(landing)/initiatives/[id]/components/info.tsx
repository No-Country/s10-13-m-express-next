'use client'
import Image from 'next/image'

type Props = {
  icon: string
  text: string
}

function DateInfoItem({ icon, text }: Props) {
  return (
    <div className='flex gap-2'>
      <Image src={icon} width={24} height={24} alt='Vercel Logo' />
      <p className='bodyText font-light'>{text}</p>
    </div>
  )
}

function InitiativeDateInfo() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='titulo-3 w-full font-medium'>Información</h1>
      <div className='flex flex-col gap-3'>
        <DateInfoItem icon='/icon/example.svg' text='Sábado 26 de agosto' />
        <DateInfoItem icon='/icon/example.svg' text='Ecoparque Tigre' />
        <DateInfoItem icon='/icon/example.svg' text='Llevar ropa fresca' />
      </div>
    </div>
  )
}

function InitiativeGallery() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='titulo-3 w-full font-medium'>Fotos</h1>
      <div className='flex flex-col gap-3'>Pendiente de implementar</div>
    </div>
  )
}

export default function InfoSec() {
  return (
    <section className='flex w-full items-center justify-center px-7'>
      <div className='container flex flex-col gap-6 bg-gray-300 p-4'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque dictum commodo. Curabitur purus quam,
          vehicula quis semper sit amet, aliquam vitae erat. Praesent quam lorem, fermentum a diam id, aliquet imperdiet
          mi. Duis volutpat felis sed augue rutrum, vitae eleifend ex aliquam. Nunc sit amet hendrerit libero.
        </p>
        <InitiativeDateInfo />
        <InitiativeGallery />
      </div>
    </section>
  )
}
