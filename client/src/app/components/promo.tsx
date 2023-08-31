'use client'
import Image from 'next/image'

type PromoItemProps = {
  iconSrc: string
  text: string
}

function PromoItem({ iconSrc, text }: PromoItemProps) {
  return (
    <div className='flex flex-col lg:items-center gap-2'>
      <Image src={iconSrc} width={40} height={40} alt='example' />
      <p>{text}</p>
    </div>
  )
}

export default function PromoSec() {
  return (
    <section className='px-7 flex justify-center items-center w-full'>
      <div className='flex flex-col gap-4 container'>
        <h2>Titulo H2</h2>
        <div className='flex flex-col lg:flex-row gap-5 bg-gray-300 p-4'>
          <PromoItem
            iconSrc='/icon/example.svg'
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque dictum commodo. Curabitur purus quam, vehicula quis semper sit amet, aliquam vitae erat. Praesent quam lorem, fermentum a diam id'
          />
          <PromoItem
            iconSrc='/icon/example.svg'
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque dictum commodo. Curabitur purus quam, vehicula quis semper sit amet, aliquam vitae erat. Praesent quam lorem, fermentum a diam id'
          />
        </div>
      </div>
    </section>
  )
}
