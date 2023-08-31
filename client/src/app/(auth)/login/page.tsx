'use client'
import { FacebookIcon, GoogleIcon, Modal } from '@/components'
import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoginForm, ModalContent } from './components'
import { AnimatePresence } from 'framer-motion';

const credentials = {
  email: 'thomasbarenghi2@gmail.com',
  password: 'test1'
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    const search = searchParams.get('userId')
    if (search) {
      Cookies.set('userId', search, { expires: 1 })
    }
  }, [searchParams])

  const handleLoginLocal = async () => {
    const { data } = await axios.post(`${serverUrl}/auth/login`, credentials)
    Cookies.set('userId', data.userId, { expires: 1 })
  }

  const handleVerify = async () => {
    try {
      await axios.get(`${serverUrl}/auth/verify`, {
        headers: {
          userId: `${Cookies.get('userId')}`
        }
      })
    } catch (err) {
      Cookies.remove('userId')
      console.log(err)
    }
  }

  const handleLogout = async () => {
    Cookies.remove('userId')
    await axios.get(`${serverUrl}/auth/logout`)
  }


  return (
    <section className='h-screen w-screen flex items-center  bg-[#f5f5fa]'>
      <div className='p-6 w-full'>
        <div className='flex py-10 items-center justify-center mb-12'>
          <Image src='Logo.svg' width={130} height={130} alt='Logo Unión Solidaria' />
          <h1 className='text-3xl'>
            <span className='text-[#D87CAC]'>Unión</span>
            <br />
            <span className='text-[#5271FF]'>Solidaria</span>
          </h1>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <p>¿No tenés cuenta?</p>
          <button
            className='font-bold text-[#5271FF] mt-2'
            onClick={() => (modalOpen ? close() : open())}
          >
            Registrate
          </button>
        </div>

        <div className='mt-6 mb-6 text-center'>
          <p className='font-bold text-[#212121]'>Iniciar sesión con:</p>
          <div className='flex py-4 justify-center gap-14'>
            <div className='h-14 w-14 bg-white rounded-full flex justify-center items-center drop-shadow-md'>
              <GoogleIcon />
            </div>
            <div className='h-14 w-14 bg-[#1878F3] rounded-full flex justify-center items-center drop-shadow-md'>
              <FacebookIcon />
            </div>
          </div>
        </div>

      </div>

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
    </section>
  )
}
