'use client'
import useUserStore from '@/store/userStore'
import { useEffect, useState } from 'react'

interface Props {
  pathname: string
}

export default function ProfilePage({ pathname }: Props) {
  const { getCurrentUser, currentUser, loggedUser } = useUserStore()
  const [isCurrent, setIsCurrent] = useState(false)

  useEffect(() => {
    const init = async () => {
      await getCurrentUser(pathname)
      setIsCurrent(loggedUser?.username === currentUser?.username)
    }
    init()
  }, [pathname])

  console.log('currentUser', currentUser, 'loggedUser', loggedUser)

  return (
    <main className='p-section flex flex-col gap-y-12'>
      <section className='items-start justify-start'>
        <div className='w-full'>
          <h1>{currentUser?.username}</h1>
          <br />
          <h1>{isCurrent ? 'Igual que el logueado' : 'No es el logueado'}</h1>
        </div>
      </section>
    </main>
  )
}
