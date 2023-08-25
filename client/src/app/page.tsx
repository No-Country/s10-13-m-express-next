'use client'
import useUserStore from "@/store/userStore"

function Home() {

  const { getUser } = useUserStore()

  getUser('1')
  return (
    <main>
      <h1 className='text-9xl text-center'>Home Page</h1>
    </main>
  )
}

export default Home
