'use client'
import useUserStore from '@/store/userStore'

function Home() {
  const { getUser } = useUserStore()

  getUser('1')
  return (
    <main>
      <h1 className='text-center text-9xl'>Home Page</h1>
    </main>
  )
}

export default Home
