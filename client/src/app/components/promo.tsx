'use client'
import Image from 'next/image'

type PromoItemProps = {
  iconSrc: string
  text: string
  className?: string
}

function PromoItem({ iconSrc, text, className }: PromoItemProps) {
  return (
    <div className='flex flex-col gap-2 lg:items-center'>
      <div className='relative aspect-[4/3] h-auto w-full'>
        <Image src={iconSrc} fill alt='example' />
      </div>
      <p className='text-center'>{text}</p>
    </div>
  )
}

export default function PromoSec() {
  return (
    <>
      <section className=' flex w-full items-center justify-center'>
        <div className='relative flex aspect-square h-full w-full items-center justify-center'>
          <Image src='/image/home/foto.png' className='z-[0] rounded-xl object-cover' fill alt='banner' />
          <div className='relative z-[1] flex flex-col items-center gap-5'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-center text-xl  font-semibold text-white'>
                Iniciativas que
                <br />
                cambian el mundo
              </h1>
              <p className='text-center text-white'>
                Únete a Unión Solidaria
                <br />y comenzá a hacer la diferencia
              </p>
            </div>
            <button className='w-max rounded-full bg-blue-600 px-6 py-2 font-semibold text-white shadow-xl'>
              Únete ahora
            </button>
          </div>
        </div>
      </section>
      <section className=' flex w-full items-center justify-center'>
        <div className='container flex flex-col gap-4'>
          <h2 className='text-xl font-normal text-blue-600'>¿Qué es Unión Solidaria?</h2>
          <div className='flex  flex-row gap-5 rounded-xl p-4 shadow-initiativeItem'>
            <PromoItem
              iconSrc='/icon/home/promo2.svg'
              text='Como voluntario/a, es donde encontrar la próxima iniciativa de la que podés ser parte.'
            />
            <PromoItem
              iconSrc='/icon/home/promo1.svg'
              text='Como organización, es donde encontrarás voluntarios/as para tu iniciativa.'
            />
          </div>
        </div>
      </section>
    </>
  )
}
