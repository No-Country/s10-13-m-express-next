import Image from 'next/image'
import LogoWithTitle from '../../../public/assets/LogoWithTitle.png'

function Footer() {
  return (
    <footer className='space-y-1 bg-pink-100 py-6 text-center text-xs text-blue-600'>
      <h6 className='flex items-center justify-center'>
        Copyright © 2023
        <Image className='h-3 w-8 object-contain' src={LogoWithTitle} alt='Logo de Unión Solidaria' />
      </h6>
      <p>Todos los derechos reservados </p>
    </footer>
  )
}

export default Footer