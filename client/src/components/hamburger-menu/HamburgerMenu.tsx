'use client'
import { Backdrop, HeartIcon, PrimaryButton } from '@/components'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import HamburgerMenuBtn from './HamburgerMenuBtn'
import MenuLinks from './MenuLinks'

const menuAnimation = {
  hidden: {
    x: '100%',
    opacity: 0
  },
  visible: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'linear',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    x: '100%',
    opacity: 0
  }
}

const HamburgerMenu = () => {
  const [menuOpened, setMenuOpen] = useState(false)
  const router = useRouter()

  const pathname = usePathname()
  if (pathname === '/login' || pathname === '/register') {
    return null
  }
  return (
    <>
      {createPortal(
        <>
          <HamburgerMenuBtn menuOpened={menuOpened} toggleMenu={() => setMenuOpen((state) => !state)} />
          <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
            {menuOpened && (
              <Backdrop onClick={() => setMenuOpen(false)}>
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  variants={menuAnimation}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  className={`fixed bottom-0 right-0 top-0 z-40 flex 
                 w-80 flex-col bg-pink-100
              `}
                >
                  <div className='flex h-14 items-center gap-4 border-b-2 border-gray-400 px-4'>
                    <Image src='/assets/logo.webp' width={24} height={24} alt='Logo Uninón Solidaria' />
                    <h2 className='text-xl font-semibold text-blue-700'>Unión Solidaria</h2>
                  </div>
                  <MenuLinks menuOpen={() => setMenuOpen(false)} />
                  <div className='flex flex-col items-center p-6'>
                    <PrimaryButton onClick={() => router.push('/login')}>Iniciar sesión</PrimaryButton>
                    <Link href='/register' className='mt-6 font-bold text-blue-500'>
                      Registrate
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        router.push('/donation')
                      }}
                      className='mt-[20vh] flex  items-center rounded-full border-2 border-blue-600 px-6 py-1.5 font-semibold'
                    >
                      <HeartIcon className='h-4 fill-blue-700' />
                      <span className='text-blue-700'>Donar</span>
                    </button>
                  </div>
                </motion.div>
              </Backdrop>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  )
}

export default HamburgerMenu
