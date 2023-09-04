'use client'
import { EyeCloseIcon, EyeOpenIcon, PrimaryButton } from '@/components'
import { useState } from 'react'

function LoginForm() {
  const [visibility, setVisibility] = useState(false)

  const close = () => setVisibility(false)
  const open = () => setVisibility(true)
  return (
    <form className='flex flex-col gap-4 items-center max-w-sm mx-auto'>
      <input
        type='text'
        id='username'
        className='border border-gray-700 rounded text-gray-900 text-sm block w-full px-3 py-4 bg-transparent placeholder:text-black'
        placeholder='Usuario'
        required
      />
      <span className='w-full relative'>
        <input
          type={visibility ? 'text' : 'password'}
          id='first_name'
          className='border border-gray-700 rounded text-gray-900 text-sm block w-full px-3 py-4 bg-transparent placeholder:text-black'
          placeholder='Contraseña'
          required
        />
        {visibility
          ? <span onClick={close} className='absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer'><EyeOpenIcon className='h-6' /></span>
          : <span onClick={open} className='absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer'><EyeCloseIcon className=' h-6' /></span>}
      </span>
      <PrimaryButton>Iniciar sesión</PrimaryButton>
    </form>
  )
}

export default LoginForm
