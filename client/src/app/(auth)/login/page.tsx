'use client'
import { FacebookIcon, GoogleIcon, Modal } from '@/components'
import Image from 'next/image'
import { useState } from 'react'
import { LoginForm, ModalContent } from '@/app/(auth)/login/components'
import { AnimatePresence } from 'framer-motion'

export default function LoginPage() {
  const [modalOpen, setModalOpen] = useState(false)

  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)

  return (
    <main className='h-screen w-screen flex items-center  bg-[#f5f5fa]'>
      <section className='p-6 w-full'>
        <div className='flex py-10 items-center justify-center mb-12'>
          <Image src='Logo.svg' width={130} height={130} alt='Logo Unión Solidaria' />
          <h1 className='text-3xl'>
            <span className='text-pink-500'>Unión</span>
            <br />
            <span className='text-blue-500'>Solidaria</span>
          </h1>
        </div>

        <LoginForm />

        <div className='mt-6 text-center'>
          <p>¿No tenés cuenta?</p>
          <button
            className='font-bold text-blue-500 mt-2'
            onClick={() => (modalOpen ? close() : open())}
          >
            Registrate
          </button>
        </div>

        <div className='mt-6 mb-6 text-center'>
          <p className='font-bold text-black'>Iniciar sesión con:</p>
          <div className='flex py-4 justify-center gap-14'>
            <button className='h-14 w-14 bg-white rounded-full flex justify-center items-center drop-shadow-md'>
              <GoogleIcon />
            </button>
            <button className='h-14 w-14 bg-[#1878F3] rounded-full flex justify-center items-center drop-shadow-md'>
              <FacebookIcon />
            </button>
          </div>
        </div>

      </section>

      <AnimatePresence
        initial={false}
        mode='wait'
        onExitComplete={() => null}
      >
        {modalOpen &&
          <Modal
            handleClose={close}
            className='bg-[#f3f3f3] w-[80%] max-w-xs rounded-3xl flex flex-col gap-12 p-8'
          >
            <ModalContent />
          </Modal>}
      </AnimatePresence>
    </main>
  )
}
