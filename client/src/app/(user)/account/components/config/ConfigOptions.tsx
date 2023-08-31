import { DonationIcon, EditProfileIcon, LogoutIcon, NominationIcon, NotificationIcon } from '@/components'
import Link from 'next/link'

function ConfigOptions() {
  return (
    <ul className='mx-auto max-w-screen-xl text-lg text-blue-700'>
      <li>
        <Link href='#' className='flex items-center gap-x-3 px-3 py-4'>
          <EditProfileIcon /> Editar Perfil
        </Link>
      </li>
      <li>
        <Link href='#' className='flex items-center gap-x-3 px-3 py-4'>
          <NominationIcon /> Mis postulaciones
        </Link>
      </li>
      <li>
        <Link href='#' className='flex items-center gap-x-3 px-3 py-4'>
          <DonationIcon /> Mis donaciones
        </Link>
      </li>
      <li>
        <Link href='#' className='flex items-center gap-x-3 px-3 py-4'>
          <NotificationIcon /> Notificaciones
        </Link>
      </li>
      <li>
        <Link href='#' className='flex items-center gap-x-3 px-3 py-4'>
          <LogoutIcon /> Cerrar sesión
        </Link>
      </li>
      <button className='w-full cursor-pointer px-3 py-4 text-center text-red-500'>Eliminar cuenta</button>
    </ul>
  )
}

export default ConfigOptions
