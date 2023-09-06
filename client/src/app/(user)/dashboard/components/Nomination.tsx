import Image from 'next/image'

interface NominationProps {
  url: string
  nombre: string
  iniciativa: string
}

const Nomination = ({ url, nombre, iniciativa }: NominationProps) => {
  return (
    <article className='flex flex-col shadow-initiativeItem bg-gray-75 min-w-[18.5rem] min-h-[6.25rem] rounded-2xl p-4 gap-2'>
      <header className='flex justify-between gap-4 items-center'>
        <div className='flex items-center gap-3'>
          <Image className='w-8 h-8 rounded-full' src={url} alt='' width={32} height={32} />
          <h3>{nombre}</h3>
        </div>
        <a className='text-blue-500'>Ver</a>
      </header>
      <p className='text-center'>Para "{iniciativa}"</p>
      <div className='flex self-center gap-4'>
        <button className='rounded-[100px] py-2 px-4 bg-blue-600 text-white'>Aceptar</button>
        <button className='rounded-[100px] py-[0.4rem] px-4 border border-blue-600 text-blue-600'>Rechazar</button>
      </div>
    </article>
  )
}

export default Nomination
